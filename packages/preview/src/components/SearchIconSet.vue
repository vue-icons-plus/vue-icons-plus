<script setup lang="ts">
import { onMounted, Ref, ref, VueElement, watch } from "vue";
import { copyTextToClipboard, getIcons } from "../useGetIcons";
import Tooltip from "./Tooltip.vue";
type Modules = { [key: string]: VueElement };

const props = defineProps({
  queryId: {
    type: String,
    default: "",
  },
  icon: {
    type: Object,
  },
});

let modules: Modules = {};
const foundData: Ref<string[]> = ref([]);

const currentIcon = ref("");
const copied = ref(false);
const handleClickIcon = (name: string) => {
  currentIcon.value = name;
  copied.value = true;
  copyTextToClipboard(`<${name} />`);
  if (copied.value) {
    setTimeout(() => {
      copied.value = false;
    }, 1000);
  }
};

const getFoundData = (modules: Modules, queryId: string) => {
  const found = Object.keys(modules).filter((name) => {
    return queryId
      .toLowerCase()
      .split(" ")
      .filter((t) => !!t)
      .every((term) => name.toLowerCase().includes(term));
  });
  return found;
};

watch(
  () => props.queryId,
  (data: string) => {
    foundData.value = getFoundData(modules, data);
  }
);

onMounted(async () => {
  const id = props.icon?.id;
  const queryId = props.queryId;
  modules = await getIcons(id);
  foundData.value = getFoundData(modules, queryId);
});
</script>

<template>
  <div
    class="icon-item"
    v-for="name in foundData"
    :key="name"
    :title="name"
    @click="handleClickIcon(name)"
  >
    <div v-if="modules[name]">
      <Tooltip>
        <template #title>{{ copied ? "copied" : "copy" }}</template>
        <div :class="['icon', { 'is-active': currentIcon === name }]">
          <component :is="modules[name]"></component>
        </div>
      </Tooltip>

      <div class="name">{{ name }}</div>
    </div>
  </div>
</template>

<style scoped>
.icon-item .icon {
  cursor: pointer;
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-white-1);
  border-radius: var(--border-radius-md);
  box-shadow: 0 1px 3px #0000001a, 0 1px 2px #0000000f;
  border: 2px solid transparent;
  font-size: 1.6em;
  transition: all ease-in 0.05s;
}

.icon-item .icon:hover,
.icon-item .icon.is-active {
  border-color: rgba(var(--color-brand-rgb), 0.5);
  background: rgba(var(--color-brand-rgb), 0.05);
}

.icon-item .name {
  margin-top: 0.5rem;
  font-size: 0.7em;
  overflow: hidden;
  user-select: all;
  white-space: nowrap;
}
</style>
