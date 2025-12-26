import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { AiFillAccountBook } from "vue-icons-plus/ai";
import { IoAddCircleSharp } from "vue-icons-plus/io";
import { CgAbstract } from "@vue-icons-plus/all-files/cg/CgAbstract";

import App from "./App.vue";

describe("App", () => {
  it("asserts correct props are passed", () => {
    const wrapper = mount(App);
    expect(
      wrapper.getComponent(AiFillAccountBook).getCurrentComponent()?.props.color
    ).toBe("red");
    expect(
      wrapper.getComponent(AiFillAccountBook).getCurrentComponent()?.props
    ).toEqual({
      color: "red",
      className: undefined,
      size: 24,
    });

    expect(
      wrapper.getComponent(IoAddCircleSharp).getCurrentComponent()?.props.size
    ).toBe("32");
    expect(
      wrapper.getComponent(IoAddCircleSharp).getCurrentComponent()?.props
    ).toEqual({
      color: undefined,
      className: undefined,
      size: "32",
    });

    expect(
      wrapper.getComponent(CgAbstract).getCurrentComponent()?.props.className
    ).toBe("cg-abstract");
    expect(
      wrapper.getComponent(CgAbstract).getCurrentComponent()?.props
    ).toEqual({
      color: undefined,
      className: "cg-abstract",
      size: 24,
    });
  });
});
