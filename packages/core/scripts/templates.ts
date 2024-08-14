import type { IconDefinition, IconTree } from "./_types";

export const renderModCode = (iconData: IconTree) => {
  return `{props: {className: String,color: String,size: {type: [String, Number], default: 24}},data() {return {treeData: ${JSON.stringify(iconData)}};},render() {const { className, color, size, treeData } = this; const conf = { stroke: "currentColor", fill: "currentColor", "stroke-width": "0", xmlns: "http://www.w3.org/2000/svg" }; const renderSvgElements = (element) => {return h(element.tag,{ ...conf, ...element.attr, ...{ height: size, width: size, className, color: color }},element.child.map((child, index) => {if (child.child && child.child.length > 0) {return renderSvgElements(child);} else {return h(child.tag, { ...child.attr });}}));};return renderSvgElements(treeData);}};`
}

export const renderComCode = (iconData: IconTree) => {
  return `{props: {className: String,color: String,size: {type: [String, Number], default: 24}},data() {return {treeData: ${JSON.stringify(iconData)}};},render() {const { className, color, size, treeData } = this; const conf = { stroke: "currentColor", fill: "currentColor", "stroke-width": "0", xmlns: "http://www.w3.org/2000/svg" }; const renderSvgElements = (element) => {return v.h(element.tag,{ ...conf, ...element.attr, ...{ height: size, width: size, className, color: color }}, element.child.map((child, index) => {if (child.child && child.child.length > 0) {return renderSvgElements(child);} else {return v.h(child.tag, { ...child.attr });} }));};return renderSvgElements(treeData);}};`
}


export const renderModCode2 = (iconData: IconTree) => {
  return `{props: {className: String,color: String,size: {type: [String, Number], default: 24}},data() {return {treeData: ${JSON.stringify(iconData)}};},render(h) {const { className, color, size, treeData } = this; const conf = { stroke: "currentColor", fill: "currentColor", "stroke-width": "0", xmlns: "http://www.w3.org/2000/svg" }; const renderSvgElements = (element) => {return h(element.tag,{attrs: {...conf,...element.attr,height: size,width: size,className,color: color}},element.child.map((child, index) => {if (child.child && child.child.length > 0) {return renderSvgElements(child);} else {return h(child.tag, {attrs: { ...child.attr }});}}));};return renderSvgElements(treeData);}};`
}

export const renderComCode2 = (iconData: IconTree) => {
  return `{props: {className: String,color: String,size: {type: [String, Number], default: 24}},data() {return {treeData: ${JSON.stringify(iconData)}};},render(h) {const { className, color, size, treeData } = this; const conf = { stroke: "currentColor", fill: "currentColor", "stroke-width": "0", xmlns: "http://www.w3.org/2000/svg" }; const renderSvgElements = (element) => {return v.h(element.tag,{attrs: {...conf,...element.attr,height: size,width: size,className,color: color}}, element.child.map((child, index) => {if (child.child && child.child.length > 0) {return renderSvgElements(child);} else {return v.h(child.tag, {attrs:{ ...child.attr }});} }));};return renderSvgElements(treeData);}};`
}



export function iconRowTemplate(
  icon: IconDefinition,
  formattedName: string,
  iconData: IconTree,
  type = "module"
) {
  switch (type) {
    case "module":
      return `export const ${formattedName} = useGenIcon(${JSON.stringify(iconData)});\n`
    case "common":
      return `module.exports.${formattedName} = useGenIcon(${JSON.stringify(iconData)});\n`;
    case "dts":
      return `export declare const ${formattedName}: IconType;\n`;
    default:
      throw new Error(`Unknown type: ${type}`);
  }
}

