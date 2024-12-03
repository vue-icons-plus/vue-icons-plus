import path from "path";
import { promises as fs } from "fs";
import findPackage from "find-package";
import camelcase from "camelcase";
import { promisify } from "util";
import { optimize as svgoOptimize } from "svgo";
import { svgoConfig } from "./svgo";
const exec = promisify(require("child_process").exec);
import { icons } from "../src/icons";
import { getIconFiles, rmDirRecursive, copyRecursive } from "./logics";
import {
  TaskContext,
  IconDefinition,
  IconsetVersion,
  IconTree,
} from "./_types";
import type { IconManifestType } from "../src/iconsManifest.d";

export async function writeDistEntryPoints({ DIST }) {
  const generateEntryCjs = function () {
    return `// THIS FILE IS AUTO GENERATED\nmodule.exports = require('./lib/index.js');`;
  };
  const generateEntryMjs = function (filename = "index.mjs") {
    return `// THIS FILE IS AUTO GENERATED\nexport * from './lib/${filename}';`;
  };
  await fs.writeFile(
    path.resolve(DIST, "index.js"),
    generateEntryCjs(),
    "utf8"
  );
  await fs.writeFile(
    path.resolve(DIST, "index.mjs"),
    generateEntryMjs(),
    "utf8"
  );
  await fs.writeFile(
    path.resolve(DIST, "index.d.ts"),
    generateEntryMjs("index.d.ts"),
    "utf8"
  );
}


export async function writePackageJson(
  override: any,
  { DIST, LIB, rootDir }: TaskContext,
) {
  const packageJsonStr = await fs.readFile(
    path.resolve(rootDir, "package.json"),
    "utf-8",
  );
  let packageJson = JSON.parse(packageJsonStr);

  delete packageJson.private;
  delete packageJson.dependencies;
  delete packageJson.devDependencies;
  delete packageJson.scripts;

  packageJson = {
    ...packageJson,
    ...override,
  };

  const editedPackageJsonStr = JSON.stringify(packageJson, null, 2) + "\n";
  await fs.writeFile(path.resolve(DIST, "package.json"), editedPackageJsonStr);
}

export async function writeIconVersions({ DIST, LIB, rootDir }: TaskContext) {
  const versions: IconsetVersion[] = [];
  // searching for icon versions from package.json and git describe command
  for (const icon of icons) {
    const files = (
      await Promise.all(icon.contents.map((content) => getIconFiles(content)))
    ).flat();
    if (files.length === 0) {
      continue;
      throw new Error(`Missing path for: ${icon.name}`);
    }

    const firstDir = path.dirname(files[0]);
    const packageJson = findPackage(firstDir, true);

    let version: string;
    if (packageJson.version && !packageJson.name.includes("vue-icons")) {
      version = packageJson.version;
    } else {
      const { stdout } = await exec(
        `git describe --tags || git rev-parse HEAD`,
        { cwd: firstDir }
      );
      version = stdout.trim();
    }

    versions.push({
      icon,
      version,
      count: files.length,
    });
  }

  const emptyVersions = versions.filter((v) => v.count === 0);
  if (emptyVersions.length !== 0) {
    throw Error(
      `empty icon sets: ${emptyVersions.map((v) => v.icon).join(", ")}`
    );
  }
  const versionsStr =
    "| Icon Library | License | Version | Count |\n" +
    "| --- | --- | --- | ---: |\n" +
    versions
      .map(
        (v) =>
          `| ${[
            `[${v.icon.name}](${v.icon.projectUrl})`,
            `[${v.icon.license}](${v.icon.licenseUrl})`,
            v.version,
            v.count,
          ].join(" | ")} |`
      )
      .join("\n") +
    "\n";

  await fs.writeFile(path.resolve(rootDir, "VERSIONS"), versionsStr, "utf8");
}

export async function writeIconsManifest({ DIST, LIB, rootDir }: TaskContext) {
  const writeObj: IconManifestType[] = icons.map((icon) => ({
    id: icon.id,
    name: icon.name,
    projectUrl: icon.projectUrl,
    license: icon.license,
    licenseUrl: icon.licenseUrl,
  }));
  const manifest = JSON.stringify(writeObj, null, 2);
  await fs.writeFile(
    path.resolve(LIB, "iconsManifest.mjs"),
    `export var IconsManifest = ${manifest}`,
    "utf8"
  );
  await fs.writeFile(
    path.resolve(LIB, "iconsManifest.js"),
    `module.exports.IconsManifest = ${manifest}`,
    "utf8"
  );
  await fs.copyFile(
    "src/iconsManifest.d.ts",
    path.resolve(LIB, "iconsManifest.d.ts")
  );
}

export async function writeLicense({ DIST, LIB, rootDir }: TaskContext) {
  const iconLicenses =
    icons
      .map((icon) =>
        [
          `${icon.name} - ${icon.projectUrl}`,
          `License: ${icon.license} ${icon.licenseUrl}`,
        ].join("\n")
      )
      .join("\n\n") + "\n";

  await fs.copyFile(
    path.resolve(rootDir, "LICENSE_HEADER"),
    path.resolve(DIST, "LICENSE")
  );
  await fs.appendFile(path.resolve(DIST, "LICENSE"), iconLicenses, "utf8");
}

export async function copyReadme({ DIST, rootDir }: TaskContext) {
  await fs.copyFile(
    path.resolve(rootDir, "../../README.md"),
    path.resolve(DIST, "README.md")
  );
}

export async function buildLib({ rootDir }: TaskContext) {
  await new Promise((resolve) => resolve(exec("vite build"))).catch((err) => {
    throw err;
  });
}

export async function copyLib({ DIST, LIB, rootDir }: TaskContext) {
  await copyRecursive(path.resolve(rootDir, "build/lib"), LIB);
}
