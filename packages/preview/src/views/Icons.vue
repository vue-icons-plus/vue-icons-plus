<script setup lang="ts">
import { reactive, computed, watchEffect } from "vue";
import { IconsManifest } from "vue-icons-plus";
import { IpLoadingOne } from "vue-icons-plus/ip";
import IconList from "../components/IconList.vue";
import DarkMode from "../components/DarkMode.vue";
import { getIcons } from "../useGetIcons";

const props = defineProps({
  id: String,
});

const iconModuleMap = reactive(new Map());

const getIconManifest = (id: string) => {
  return IconsManifest.find((i: any) => i.id === id);
};

const iconManifest = computed(() => getIconManifest(props.id || ""));

watchEffect(async () => {
  const iconModule = await getIcons(props.id || "");
  iconModuleMap.set(props.id, iconModule);
});
</script>

<template>
  <div class="main">
    <div class="main-header">
      <div class="main-header__content">
        <h1 class="main-title">
          {{ iconManifest.name }}
          <span v-if="iconModuleMap.has(iconManifest.id)">
            (<span>total: </span>
            {{ Object.keys(iconModuleMap.get(iconManifest.id)).length }})
          </span>
        </h1>
      </div>
    </div>
    <div class="icon-main__scroll">
      <div class="icon-main-header">
        <div class="icon-main-info">
          <div>
            <span>License: </span>
            <a :href="iconManifest.licenseUrl" target="__target">
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
        <highlightjs
          language="js"
          :code="`import { IconName } from 'vue-icons-plus/${iconManifest.id}'`"
        />
      </div>
      <div v-if="iconModuleMap.has(iconManifest.id)">
        <IconList :iconList="iconModuleMap.get(iconManifest.id)" />
      </div>
      <div v-else class="loading">
        <IpLoadingOne class="icon-loading" size="18" color="#c0c0c0" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading {
  font-size: 0.8rem;
  color: var(--color-gray-4);
}

.icon-main__scroll {
  padding: 0 2rem;
  height: calc(100vh - 105px);
  overflow: auto;
}

.icon-main-info {
  align-items: center;
  display: flex;
  padding: 1.5rem 0;
}
.icon-main-info div {
  font-weight: 500;
  margin-right: 2rem;
}
.icon-main-example pre {
  color: #e1e4e8;
  margin-top: 0;
  margin-bottom: 2rem;
  background-color: #24292e;
  border-radius: var(--border-radius-md);
}
.icon-main-example code {
  font-size: 16px;
  padding: 24px;
  line-height: 60px;
}
</style>
