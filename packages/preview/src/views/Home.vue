<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { IconsManifest } from "vue-icons";
import IconList from "../components/IconList.vue";
import { getIcons } from "../useGetIcons";
import { SlActionRedo, SlArrowLeft } from "vue-icons/sl";
import { SlWrench } from "@vue-icons/all-files/icons/sl/SlWrench";
import { AiFillApi } from "@vue-icons/all-files/icons/ai/AiFillApi";

const installCode = `yarn add vue-icons
# or
npm install vue-icons --save`;
const example = `<script setup lang="ts">
import { SlActionRedo } from "vue-icons/sl";
<script />

<template>
  <SlActionRedo />
</template>`;
const iconsManifest = reactive(IconsManifest);
const iconModulesMap = reactive(new Map());
const moduleCounts: { [key: string]: number } = reactive({});
const allCounts = ref(0);

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
    <h1 class="main-title">Vue Icons</h1>
    <p>
      <a href="https://www.npmjs.com/package/react-icons" rel="nofollow"
        ><img
          src="https://img.shields.io/npm/v/react-icons.svg"
          alt="npm"
          height="20" /></a
      > <a
        href="https://github.com/react-icons/react-icons/actions"
        rel="nofollow"
        ><img
          src="https://github.com/react-icons/react-icons/actions/workflows/nodejs.yml/badge.svg"
          alt="GitHub Actions build status"
          height="20"
      /></a>
    </p>
    <p>
      Include popular icons in your Vue projects easily with vue-icons, which
      utilizes ES6 imports that allows you to include only the icons that your
      project is using.
    </p>

    <h2 class="sub-title">Include icon sets (total: {{ allCounts }})</h2>
    <div class="main-content">
      <div class="icon-set" v-for="item in IconsManifest" :key="item.id">
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
    <h2 class="sub-title">Usage</h2>
    <highlightjs language="js" :code="example" />
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
      <SlWrench :size="12" />
      <SlWrench :size="24" />
      <SlWrench :size="36" />
      <SlWrench :size="48" />
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
  font-weight: 400;
  margin-top: 0;
  margin-bottom: var(--space-2);
  padding-top: var(--space-1);
}
.main-content {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, auto));
  gap: 24px;
  margin-bottom: var(--space-2);
}
.icon-set {
  color: var(--color-black);
  background: var(--color-white);
  padding: 5px 8px 8px;
  border-radius: var(--border-radius-md);
  box-shadow: 0 1px 3px #0000001a, 0 1px 2px #0000000f;
  transition: background-color 0.15s ease;
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
