import path from "path";
import { promises as fs } from "fs";
import camelcase from "camelcase";
import { optimize as svgoOptimize } from "svgo"
import { svgoConfig } from "./svgo";
import { icons } from "../src/icons";
import { iconRowTemplate } from "./templates";
import { getIconFiles, rmDirRecursive, convertIconData } from "./logics";
import { TaskContext, IconDefinition } from "./_types";

export async function dirInit({ DIST, LIB }: TaskContext) {
  const ignore = (err: any) => {
    if (err?.code === "EEXIST") return;
    throw err;
  };
  await rmDirRecursive(DIST).catch((err) => {
    if (err.code === "ENOENT") return;
    throw err;
  });
  await fs.mkdir(DIST, { recursive: true }).catch(ignore);
  await fs.mkdir(LIB).catch(ignore);

  for (const icon of icons) {
    await fs.mkdir(path.resolve(DIST, icon.id)).catch(ignore);
  }
  // const initFiles = ["index.d.ts", "index.js", "index.mjs"];

  // const write = (dir: string, filePath: string[], str: string) =>
  //   fs.writeFile(path.resolve(dir, ...filePath), str, "utf8").catch(ignore);

  // for (const file of initFiles) {
  //   await write(DIST, [file], "// THIS FILE IS AUTO GENERATED\n");
  // }
}

export async function writeFiles(icon: IconDefinition, { DIST }: TaskContext, version = 'vue3') {
  const exists = new Set(); // for remove duplicate
  for (const content of icon.contents) {
    const files = await getIconFiles(content);
    for (const file of files) {
      const svgStrRaw = await fs.readFile(file, "utf8");
      const svgStr = content.processWithSVGO
        ? await svgoOptimize(svgStrRaw, svgoConfig).data
        : svgStrRaw;
      const iconData = await convertIconData(svgStr, content.multiColor);

      const rawName = path.basename(file, path.extname(file));
      const pascalName = camelcase(rawName, { pascalCase: true });
      const componentName =
        (content.formatter && content.formatter(pascalName, file)) || pascalName;
      if (exists.has(componentName)) continue;
      exists.add(componentName);


      const modHeader = `// THIS FILE IS AUTO GENERATED\nimport { useGenIcon } from "../lib/index.mjs";\n`;
      const modRes = iconRowTemplate(icon, componentName, iconData, "module")
      await fs.writeFile(
        path.resolve(DIST, icon.id, `${componentName}.mjs`),
        modHeader + modRes,
        "utf8",
      );


      const comHeader =
        `// THIS FILE IS AUTO GENERATED\nconst useGenIcon = require('../lib').useGenIcon;\n`;
      const comRes = iconRowTemplate(icon, componentName, iconData, "common")
      await fs.writeFile(
        path.resolve(DIST, icon.id, `${componentName}.js`),
        comHeader + comRes,
        "utf8",
      );


      const dtsHeader =
        "// THIS FILE IS AUTO GENERATED\nimport { IconType } from '../lib';\n";
      const dtsRes = iconRowTemplate(icon, componentName, iconData, "dts")
      await fs.writeFile(
        path.resolve(DIST, icon.id, `${componentName}.d.ts`),
        dtsHeader + dtsRes,
        "utf8",
      );

      exists.add(file);
    }
  }
}


