import { h, version } from "vue";
import { IconTree } from './IconTree.d'
export const useGenIcon = (data: IconTree) => {
  return {
    props: {
      className: String,
      color: String,
      size: { type: [String, Number], default: 24 }
    },
    data() {
      return {
        treeData: data
      };
    },
    render() {
      const { className, color, size, treeData } = this;
      const conf = {
        stroke: "currentColor",
        fill: "currentColor",
        "stroke-width": "0",
        xmlns: "http://www.w3.org/2000/svg"
      };
      const renderSvgElements = el => {
        return h(
          el.tag,
          version.startsWith('2.7.')
            ? {
              attrs: {
                ...conf,
                ...el.attr,
                height: size,
                width: size,
                className,
                color: color
              }
            } : {
              ...conf,
              ...el.attr,
              ...{ height: size, width: size, className, color: color },
            },
          el.child.map((node) => {
            if (node.child && node.child.length > 0) {
              return renderSvgElements(node);
            } else {
              return h(node.tag, version.startsWith('2.7.') ? { attrs: { ...node.attr } } : { ...node.attr });
            }
          })
        );
      };
      return renderSvgElements(treeData);
    }
  };
};
