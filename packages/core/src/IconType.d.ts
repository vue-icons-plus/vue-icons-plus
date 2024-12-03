import { VNode } from "vue";

export type IconType = {
  props: {
    className: String;
    color: String;
    size: {
      type: (String | Number)[];
      default: number;
    };
  };
  render(): VNode;
};
