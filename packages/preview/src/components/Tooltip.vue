<script setup lang="ts"></script>
<template>
  <div class="tooltip">
    <span class="tooltip-title">
      <slot name="title"></slot>
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

.tooltip:hover .tooltip-title {
  display: block;
}

.tooltip .tooltip-title {
  display: none;
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
  left: 100px;
}
.tooltip .tooltip-title::after {
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
