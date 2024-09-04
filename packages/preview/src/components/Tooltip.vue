<script setup lang="ts">
import { ref } from "vue";
const emit = defineEmits(["onOpenChange"]);
const visible = ref(false);
const onOpenChange = (isVisible: boolean) => {
  setTimeout(() => {
    visible.value = isVisible;
    emit("onOpenChange", visible.value);
  }, 200);
};
</script>
<template>
  <div
    class="tooltip"
    @mouseenter="onOpenChange(true)"
    @mouseleave="onOpenChange(false)"
  >
    <span class="tooltip-text" v-show="visible">
      <slot name="content"></slot>
    </span>
    <slot></slot>
  </div>
</template>
<style scoped>
.tooltip {
  width: 100%;
  height: auto;
  position: relative;
  display: inline-block;
}

.tooltip .tooltip-text {
  font-size: 12px;
  min-width: 30px;
  height: 32px;
  line-height: 32px;
  color: #fff;
  background-color: black;
  text-align: center;
  padding: 0px 12px;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  top: 17px;
  left: 105px;
}
.tooltip .tooltip-text::after {
  content: " ";
  position: absolute;
  top: 50%;
  right: 100%;
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent black transparent transparent;
}
</style>
