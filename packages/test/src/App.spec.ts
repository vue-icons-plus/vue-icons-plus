import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { AiFillAccountBook } from "vue-icons-plus/ai";
import { IoAddCircleSharp } from "vue-icons-plus/io";
import { CgAbstract } from "@vue-icons-plus/all-files/icons/cg/CgAbstract";

import App from './App.vue'


describe('App', () => {
  it('asserts correct props are passed', () => {
    const wrapper = mount(App)
    expect(wrapper.getComponent(AiFillAccountBook).vm.color).toBe('red')
    expect(wrapper.getComponent(AiFillAccountBook).props()).toEqual({ color: 'red', className: undefined, size: 24 })

    expect(wrapper.getComponent(IoAddCircleSharp).vm.size).toBe('32')
    expect(wrapper.getComponent(IoAddCircleSharp).props()).toEqual({ color: undefined, className: undefined, size: '32' })

    expect(wrapper.getComponent(CgAbstract).vm.className).toBe('cg-abstract')
    expect(wrapper.getComponent(CgAbstract).props()).toEqual({ color: undefined, className: 'cg-abstract', size: 24 })

  })
})


