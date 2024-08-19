<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { copyTextToClipboard } from "././../useGetIcons";

const route = useRoute();
const props = defineProps({
  iconList: {
    type: Object,
  },
  plain: {
    type: Boolean,
    default: false,
  },
});
const currentIcon = ref("");
const handleClickIcon = (name: string) => {
  if (props.plain) return;
  currentIcon.value = name;
  copyTextToClipboard(`<${name} />`);
};
</script>

<template>
  <div :class="[plain ? 'icon-box-plain' : 'icon-box']">
    <div
      class="icon-item"
      v-for="(icon, key) in props.iconList"
      :key="key"
      @click="handleClickIcon(key)"
    >
      <div class="icon" :class="{ 'is-active': currentIcon === key }">
        <component :is="icon"></component>
      </div>
      <div v-show="!plain" class="name">{{ route.params.id }} {{ key }}</div>
    </div>
  </div>
</template>

<style scoped>
.icon-box-plain {
  line-height: 1rem;
  margin-top: 7px;
  display: grid;
  grid: 1fr / repeat(20, 1em);
  gap: 5px;
  overflow: hidden;
  font-size: 1.5rem;
  -webkit-mask-image: linear-gradient(90deg, #fff 50%, transparent);
}

.icon-box {
  display: grid;
  grid-auto-rows: auto;
  grid-auto-columns: max-content;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  text-align: center;
}
.icon-box .icon {
  cursor: pointer;
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-white);
  border-radius: var(--border-radius-md);
  box-shadow: 0 1px 3px #0000001a, 0 1px 2px #0000000f;
  border: 2px solid transparent;
  font-size: 1.6em;
  transition: all ease-in 0.05s;
}

.icon-box .icon:hover,
.icon-box .icon.is-active {
  border-color: rgba(var(--color-brand-rgb), 0.5);
  background: rgba(var(--color-brand-rgb), 0.05);
}

.icon-box .name {
  margin-top: 0.5rem;
  font-size: 0.7em;
  overflow: hidden;
  user-select: all;
  white-space: nowrap;
}
</style>
