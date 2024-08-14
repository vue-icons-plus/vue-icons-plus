import path from "path";
import { performance } from "perf_hooks";
import { TaskContext } from "./_types";
import { icons } from "../src/icons";
import * as taskCommon from "./task_common"
import * as taskIcons from "./task_icons"
import * as taskAllFiles from "./task_all_files";


// file path
const _rootDir = path.resolve(__dirname, "../");

async function task(name: string, fn: () => Promise<void> | void) {
  const start = performance.now();
  console.log(`================= ${name} =================`);
  await fn();

  const end = performance.now();
  console.log(`${name}: `, Math.floor(end - start) / 1000, "sec\n\n");
}

async function main() {
  try {
    // lib: vue-icons
    const iconsOpt: TaskContext = {
      rootDir: _rootDir,
      DIST: path.resolve(_rootDir, "../vue-icons"),
      ICONS: path.resolve(_rootDir, "../vue-icons/icons"),
      LIB: path.resolve(_rootDir, "../vue-icons/lib"),
    };
    await task("vue-icons initialize", async () => {
      await taskIcons.dirInit(iconsOpt);
      await taskCommon.writeDistEntryPoints(iconsOpt);
      await taskCommon.writeLicense(iconsOpt);
      await taskCommon.copyReadme(iconsOpt);
    });
    await task("vue-icons write icons", async () => {
      await Promise.all(
        icons.map((icon) => taskIcons.writeIconModule(icon, iconsOpt)),
      );
    });



    // // lib: vue-icons/all-files
    const allFilesOpt: TaskContext = {
      rootDir: _rootDir,
      DIST: path.resolve(_rootDir, "../vue-icons_all-files"),
      ICONS: path.resolve(_rootDir, "../vue-icons_all-files/icons"),
      LIB: path.resolve(_rootDir, "../vue-icons_all-files/lib"),
    };
    await task("vue-icons/all-files initialize", async () => {
      await taskAllFiles.dirInit(allFilesOpt);
      await taskCommon.writeDistEntryPoints(allFilesOpt);
      await taskCommon.writeLicense(allFilesOpt);
      await taskCommon.copyReadme(allFilesOpt);
    });
    await task("vue-icons/all-files write files", async () => {
      await Promise.all(
        icons.map((icon) => taskAllFiles.writeFiles(icon, allFilesOpt))
      )
    });


    // write files to lib
    await task("core build common library", async () => {
      await taskCommon.buildLib(iconsOpt);
      await taskCommon.copyLib(iconsOpt);
      await taskCommon.copyLib(allFilesOpt);
    });


    // write to VERSIONS file
    await task("core write icon versions", async () => {
      await taskCommon.writeIconVersions(allFilesOpt);
    });

    console.log("done");
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

main()

export { };
