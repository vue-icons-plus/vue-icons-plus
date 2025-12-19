import type { IconDefinition, IconTree } from "./_types";

export function iconRowTemplate(
  icon: IconDefinition,
  formattedName: string,
  iconData: IconTree,
  type = "module"
) {
  switch (type) {
    case "module":
      return `export const ${formattedName} = useGenIcon(${JSON.stringify(
        iconData
      )});\n`;
    case "common":
      return `module.exports.${formattedName} = useGenIcon(${JSON.stringify(
        iconData
      )});\n`;
    case "dts":
      return `export declare const ${formattedName}: IconType;\n`;
    default:
      throw new Error(`Unknown type: ${type}`);
  }
}
