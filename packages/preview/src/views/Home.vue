<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { IconManifestType, IconsManifest } from "vue-icons-plus";
import IconList from "../components/IconList.vue";
import { getIcons } from "../useGetIcons";
import { SlActionRedo, SlArrowLeft } from "vue-icons-plus/sl";
import { FcAbout } from "@vue-icons-plus/all-files/icons/fc/FcAbout";
import { AiFillApi } from "@vue-icons-plus/all-files/icons/ai/AiFillApi";
import { AiFillGithub } from "@vue-icons-plus/all-files/icons/ai/AiFillGithub";
import { Fa6Npm } from "@vue-icons-plus/all-files/icons/fa6/Fa6Npm";
import { installCode, example } from "../example";
import emitter from "../mitt";

const router = useRouter();
const iconsManifest = reactive(IconsManifest);
const iconModulesMap = reactive(new Map());
const moduleCounts: { [key: string]: number } = reactive({});
const allCounts = ref(0);
const currentId = ref("");

const handleClick = (icon: IconManifestType) => {
  currentId.value = icon.id;
  emitter.emit("getActiveId", icon.id);
  router.push({
    path: `/icons/${icon.id}`,
  });
};

onMounted(() => {
  iconsManifest.forEach(async (item) => {
    const id = item.id;
    const module = await getIcons(id);
    const componentNames = Object.keys(module);
    const counts = Object.keys(module).length;
    const icons = componentNames.slice(0, 12).map((name) => module[name]);
    iconModulesMap.set(id, icons);
    moduleCounts[id] = counts;
    allCounts.value += counts;
  });
});
</script>

<template>
  <div class="main">
    <div style="display: flex">
      <h1 class="main-title">Vue Icons Plus</h1>
      <a
        href="https://github.com/vue-icons-plus/vue-icons-plus"
        target="__blank"
        rel="nofollow"
      >
        <AiFillGithub style="margin: 0 6px" />
      </a>
      <a
        href="https://www.npmjs.com/package/vue-icons-plus"
        target="__blank"
        rel="nofollow"
      >
        <Fa6Npm />
      </a>
    </div>
    <p>
      <a href="https://www.npmjs.com/package/vue-icons-plus" rel="nofollow"
        ><img
          src="https://img.shields.io/badge/yarn-3.6.1-brightgreen"
          alt="npm"
          height="20" /></a
      > <a
        href="https://github.com/vue-icons-plus/vue-icons-plus/actions"
        rel="nofollow"
        ><img
          src="https://img.shields.io/badge/Node.js%20CI-passing-brightgreen"
          alt="GitHub Actions build status"
          height="20"
      /></a>
    </p>
    <p>
      Include popular icons in your Vue projects easily with vue-icons-plus,
      which utilizes ES6 imports that allows you to include only the icons that
      your project is using.
    </p>

    <h2 class="sub-title">Change Log</h2>
    <p>
      Add ByteDance Icon Library
      <a href="https://iconpark.oceanengine.com/official" target="_blank"
        >IconPark</a
      >
      (2024-08-19)
    </p>
    <h2 class="sub-title">Include icon sets (total: {{ allCounts }})</h2>
    <div class="main-content">
      <div
        class="icon-set"
        :class="{ 'is-active': currentId === item.id }"
        v-for="item in IconsManifest"
        :key="item.id"
        @click="handleClick(item)"
      >
        <div class="name">{{ item.name }}</div>
        <div v-if="iconModulesMap.has(item.id)">
          <div class="describe">{{ moduleCounts[item.id] }} icons</div>
          <IconList :iconList="iconModulesMap.get(item.id)" plain />
        </div>
        <span v-else class="describe">下载中</span>
      </div>
    </div>
    <h2 class="sub-title">Installation</h2>
    <highlightjs lang="bash" :code="installCode" />
    <h2 class="sub-title">Usage for Vue 3</h2>
    <highlightjs language="js" :code="example.vue3" />
    <h2 class="sub-title">Usage for Vue ^2.7</h2>
    <highlightjs language="js" :code="example.vue2" />
    <h2 class="sub-title">Demo</h2>
    <div class="main-demo">
      <SlActionRedo :size="12" />
      <SlActionRedo :size="24" />
      <SlActionRedo :size="36" />
      <SlActionRedo :size="48" />
      <SlArrowLeft :size="12" />
      <SlArrowLeft :size="24" />
      <SlArrowLeft :size="36" />
      <SlArrowLeft :size="48" />
      <FcAbout :size="12" />
      <FcAbout :size="24" />
      <FcAbout :size="36" />
      <FcAbout :size="48" />
      <AiFillApi :size="12" />
      <AiFillApi :size="24" />
      <AiFillApi :size="36" />
      <AiFillApi :size="48" />
    </div>
    <h2 class="sub-title">Props</h2>
    <table border="1">
      <thead>
        <tr>
          <th>Key</th>
          <th>Type</th>
          <th>Default</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>color</code></td>
          <td><code>String</code></td>
          <td><code>undefined</code> (inherit)</td>
          <td></td>
        </tr>
        <tr>
          <td><code>size</code></td>
          <td><code>String | Number</code></td>
          <td><code>24</code></td>
          <td></td>
        </tr>
        <tr>
          <td><code>className</code></td>
          <td><code>String</code></td>
          <td><code>undefined</code></td>
          <td></td>
        </tr>
        <tr>
          <td><code>style</code></td>
          <td><code>undefined</code></td>
          <td><code>Can overwrite size and color</code></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.main {
  padding: var(--space-3);
  height: calc(100vh - 68px);
  overflow-y: auto;
}
.main-title {
  padding: 0 0 8px 0;
  margin-bottom: 0;
  font-size: 2.2rem;
}
.sub-title {
  font-weight: 500;
  margin-bottom: var(--space-2);
  padding-top: var(--space-2);
}
.main-content {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, auto));
  gap: 24px;
  margin-bottom: var(--space-2);
}
.icon-set {
  cursor: pointer;
  color: var(--color-black);
  background: var(--color-white);
  padding: 5px 8px 8px;
  border-radius: var(--border-radius-md);
  border: 2px solid transparent;
  box-shadow: 0 1px 3px #0000001a, 0 1px 2px #0000000f;
  transition: background-color 0.15s ease;
  &:hover,
  &.is-active {
    border-color: rgba(var(--color-brand-rgb), 0.5);
    background: rgba(var(--color-brand-rgb), 0.05);
  }
}
.icon-set .name {
  font-size: 1.2rem;
}
.icon-set .describe {
  font-size: 0.8rem;
  color: var(--color-gray-4);
}

.main-demo {
  margin-bottom: var(--space-2);
}
table {
  width: 100%;
  border-collapse: collapse;
  margin: 25px 0;
  min-width: 400px;
  overflow: hidden;
  border: 1px solid var(--color-gray-2);
}

th {
  color: var(--color-gray-5);
  font-size: 1em;
  padding: 1em;
  text-align: left;
  border: 1px solid var(--color-gray-2);
  font-weight: bold;
  background: var(--color-gray-1);
}

tr {
  border: 1px solid #fff;
  background-color: #fff;
}

td {
  color: var(--color-gray-5);
  padding: 1em;
  border: 1px solid var(--color-gray-2);
  text-align: left;
}
</style>
