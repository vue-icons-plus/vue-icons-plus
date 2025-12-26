<script setup lang="ts">
import { onMounted } from "vue";
import Logo from "./components/Logo.vue";
import Search from "./components/Search.vue";
import Sider from "./views/Sider.vue";

onMounted(async () => {});
</script>

<template>
  <div class="layout">
    <aside class="layout-aside">
      <Logo />
      <Search />
      <Sider />
      <!-- <IoAccessibility /> -->
    </aside>
    <main class="layout-main">
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
}
.layout .layout-aside {
  width: 260px;
  padding-top: var(--space-3);
  background: #f4f5f7;
}
.layout-main {
  flex: 1;
}
/* 定义过渡样式 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active for <=2.1.8 */ {
  opacity: 0;
}
</style>
