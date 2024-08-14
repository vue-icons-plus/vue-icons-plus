<script setup lang="ts">
import { reactive, onMounted, watch, nextTick, ref } from "vue";
import { useRouter } from "vue-router";
import * as iconModules from "@vue-icons/all";
import MyWorker from "../worker.ts?worker";
import emitter from "../mitt";

const router = useRouter();
const props = defineProps({ id: String });
const rootRef = ref(null);
const observerEl = ref(null);
const currentIcon = ref(null);
let icons = reactive([]);
let sliceIcons = reactive([]);
let iconManifest = reactive({});
const iconMap = new Map();

const getIcons = (id) => {
  const list = [];
  for (const icon in iconModules) {
    const substr = icon.substring(0, 2);
    if (id && substr.toLowerCase() === id) {
      list.push(iconModules[icon]);
      iconMap.set(id, list);
    }
  }
  return list;
};

const observer = (icons) => {
  const count = 50;
  let startIndex = 0;
  let endIndex = 0;
  sliceIcons = icons.slice(startIndex, count);
  const observerIO = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      startIndex += count;
      endIndex = startIndex + count;
      if (endIndex >= icons.length) {
        observerIO.unobserve(entries[0].target);
      }
      requestAnimationFrame(() => {
        sliceIcons = [...sliceIcons, ...icons.slice(startIndex, endIndex)];
      });
    }
  });
  observerIO.observe(observerEl.value);
};

const handleClickIcon = (name) => {
  currentIcon.value = name;
};

onMounted(() => {
  emitter.on("iconManifest", (data) => {
    iconManifest = data;
    icons = getIcons(data.id);
  });
});
</script>

<template>
  <div class="icon-container">
    <div class="icon-header">
      {{ iconManifest.name || "Vue icons" }}
    </div>
    <div class="icon-main">
      <div class="icon-main-header">
        <div class="icon-main-info">
          <div>
            <span>Total: </span>
            <span>{{ icons.length }}</span>
          </div>
          <div>
            <span>License: </span>
            <a :href="iconManifest.license" target="__target">
              {{ iconManifest.license || "MIT" }}
            </a>
          </div>
          <div>
            <span>Project: </span>
            <a :href="iconManifest.projectUrl" target="__target">
              {{ iconManifest.projectUrl || "http://localhost:5173/icons/" }}
            </a>
          </div>
        </div>
      </div>
      <div class="icon-main-example">
        <pre
          tabindex="0"
          data-language="jsx"
        ><code><span class="line"><span style="color:#F97583">import</span><span style="color:#E1E4E8"> { IconName } </span><span style="color:#F97583">from</span><span style="color:#9ECBFF"> "vue-icons/{{ iconManifest.id }}"</span><span style="color:#E1E4E8">;</span></span></code></pre>
      </div>
      <div class="icon-main-content" ref="rootRef">
        <div
          class="icon-item"
          :class="{ 'is-active': currentIcon === icon.name }"
          v-for="icon of icons"
          :key="icon.name"
        >
          <span class="icon-item-comp" @click="handleClickIcon(icon.name)"
            ><component :is="icon"></component
          ></span>
          <span class="icon-item-name">{{ icon.name }}</span>
        </div>
        <span ref="observerEl">adsfadf</span>
      </div>
      <div v-for="item of iconMap.keys()" :key="item">{{ item }}</div>
    </div>
  </div>
</template>

<style scoped>
.icon-header {
  padding: 12px 24px;
  font-size: 2.2rem;
  border-bottom: 1px solid var(--color-gray-1);
}
.icon-main {
  padding: 0 24px;
  height: calc(100vh - 80px);
  overflow: auto;
}

.icon-main-info {
  display: flex;
}
.icon-main-info div {
  font-weight: 500;
  margin: 16px 16px 8px 0;
}
.icon-main-example pre {
  color: #e1e4e8;
  margin-bottom: 2rem;
  background-color: #24292e;
  border-radius: var(--border-radius-md);
}
.icon-main-example code {
  font-size: 16px;
  padding: 24px;
  line-height: 60px;
}
.icon-main-content {
  display: grid;
  grid-auto-rows: auto;
  grid-auto-columns: max-content;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  text-align: center;
}
.icon-item-comp {
  cursor: pointer;
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  box-shadow: 0 1px 3px #0000001a, 0 1px 2px #0000000f;
  border: 2px solid transparent;
  transition: ease 0.05s;
}
.icon-item-comp:hover,
.is-active .icon-item-comp {
  background: #ebecef;
}
.is-active .icon-item-name {
  /* color: #f082a8; */
}
.icon-item-name {
  font-size: 12px;
}
</style>
