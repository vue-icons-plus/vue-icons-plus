<script setup lang="ts">
import { reactive, onMounted, ref, Ref } from "vue";
import { IconManifestType } from "vue-icons-plus";
import IconList from "../components/IconList.vue";
import { getIcons } from "../utils";
import emitter from "../mitt";
const iconManifest: Ref<IconManifestType> = ref({});
const iconModuleMap = reactive(new Map());

onMounted(() => {
  emitter.on("getCurrentIcon", async (data: IconManifestType) => {
    iconManifest.value = data;
    const iconModule = await getIcons(data.id);
    iconModuleMap.set(data.id, iconModule);
  });
});
</script>

<template>
  <div class="main">
    <h1 class="main-title">
      {{ iconManifest.name }}
      <span v-if="iconModuleMap.has(iconManifest.id)">
        (<span>total: </span>
        {{ Object.keys(iconModuleMap.get(iconManifest.id)).length }})
      </span>
    </h1>
    <div class="icon-main">
      <div class="icon-main-header">
        <div class="icon-main-info">
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
        <highlightjs
          language="js"
          :code="`import { IconName } from 'vue-icons-plus/${iconManifest.id}'`"
        />
      </div>
      <div v-if="iconModuleMap.has(iconManifest.id)">
        <IconList :iconList="iconModuleMap.get(iconManifest.id)" />
      </div>
      <div v-else class="loading">加载中...</div>
    </div>
  </div>
</template>

<style scoped>
.loading {
  font-size: 0.8rem;
  color: var(--color-gray-4);
}
.main-title {
  padding: var(--space-3) var(--space-3) var(--space-2);
  margin-bottom: 0;
  font-size: 2.2rem;
  border-bottom: 1px solid var(--color-gray-1);
}
.icon-main {
  padding: 0 var(--space-3) var(--space-3);
  height: calc(100vh - 125px);
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
</style>
