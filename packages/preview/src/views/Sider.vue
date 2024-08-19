<script setup lang="ts">
import { reactive, watch, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { type IconManifestType, IconsManifest } from "vue-icons-plus/lib";
import emitter from "../mitt";

const router = useRouter();
const currentId = ref("");

const iconsManifest = reactive(IconsManifest).sort((a, b) =>
  a.name.localeCompare(b.name)
);

const handleClick = (icon: IconManifestType) => {
  currentId.value = icon.id;
};

watch(
  () => router.currentRoute.value,
  (route) => {
    if (route.path === "/icons/") {
      currentId.value = "";
    }
  }
);

onMounted(() => {
  emitter.on("getActiveId", (id: string) => {
    currentId.value = id;
  });
});
</script>

<template>
  <div class="sider-menu">
    <div
      class="menu-item"
      :class="{ 'is-active': currentId === icon.id }"
      v-for="icon in iconsManifest"
      :key="icon.id"
      @click="handleClick(icon)"
    >
      <router-link :to="{ path: `/icons/${icon.id}` }">
        <span>{{ icon.name }}</span>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.sider-menu {
  padding: 0 var(--space-2) var(--space-2);
  height: calc(100vh - 185px);
  overflow: auto;
}
.menu-item {
  cursor: pointer;
  height: 48px;
  line-height: 48px;
  padding: 0 12px;
  margin: 1px 0;
  border-radius: 6px;
  border: 1px solid transparent;
  transition: ease 0.1s;
}
.menu-item a {
  display: block;
  color: var(--color-black);
  transition: ease 0.1s;
}

.menu-item.is-active {
  border-color: transparent;
  background: var(--color-gray-2);
  font-weight: 600;
}

.is-active a {
  color: rgba(var(--color-brand-rgb), 0.5);
}
.menu-item:hover {
  border-color: transparent;
  background: var(--color-gray-2);
}
</style>
