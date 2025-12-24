import { h, version, SVGAttributes } from "vue";

export interface IconTree {
  tag: string;
  attr: { [key: string]: string };
  child: IconTree[];
}

export interface IconBaseProps extends SVGAttributes {
  children?: any;
  size?: string | number;
  color?: string;
  title?: string;
}

export type IconType = (props: IconBaseProps) => ReturnType<typeof GenIcon>;

export const useGenIcon = (svgData: IconTree) => {
  return {
    props: {
      className: String,
      color: String,
      size: { type: [String, Number], default: 24 },
    },
    data() {
      return {
        svgData,
      };
    },
    render() {
      const { className, color, size, svgData } = this;
      const conf = {
        stroke: "currentColor",
        fill: "currentColor",
        "stroke-width": "0",
        xmlns: "http://www.w3.org/2000/svg",
      };
      const renderSvgElements = (svgEl) => {
        return h(
          svgEl.tag,
          version.startsWith("2.7.")
            ? {
                attrs: {
                  ...conf,
                  ...svgEl.attr,
                  height: size,
                  width: size,
                  className,
                  color: color,
                },
              }
            : {
                ...conf,
                ...svgEl.attr,
                ...{ height: size, width: size, className, color: color },
              },
          svgEl.child.map((node) => {
            if (node.child && node.child.length > 0) {
              return renderSvgElements(node);
            } else {
              return h(
                node.tag,
                version.startsWith("2.7.")
                  ? { attrs: { ...node.attr } }
                  : { ...node.attr }
              );
            }
          })
        );
      };
      return renderSvgElements(svgData);
    },
  };
};

export function GenIcon(svgData: IconTree) {
  return (props: IconBaseProps) => h(IconBase, { svgData, ...props });
}

export const IconBase = {
  props: {
    className: String,
    color: String,
    size: { type: [String, Number], default: 24 },
    svgData: { type: Object },
  },
  render() {
    const { className, color, size, svgData } = this;
    const conf = {
      stroke: "currentColor",
      fill: "currentColor",
      "stroke-width": "0",
      xmlns: "http://www.w3.org/2000/svg",
    };
    const renderSvgElements = (svgEl) => {
      return h(
        svgEl.tag,
        version.startsWith("2.7.")
          ? {
              attrs: {
                ...conf,
                ...svgEl.attr,
                height: size,
                width: size,
                className,
                color: color,
              },
            }
          : {
              ...conf,
              ...svgEl.attr,
              ...{ height: size, width: size, className, color: color },
            },
        svgEl.child.map((node) => {
          if (node.child && node.child.length > 0) {
            return renderSvgElements(node);
          } else {
            return h(
              node.tag,
              version.startsWith("2.7.")
                ? { attrs: { ...node.attr } }
                : { ...node.attr }
            );
          }
        })
      );
    };
    return renderSvgElements(svgData);
  },
};
