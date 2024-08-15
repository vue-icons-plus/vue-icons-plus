<script setup lang="ts">
import { useRouter } from "vue-router";
import emitter from "../mitt";
const router = useRouter();

const handleClick = () => {
  router.push({
    path: "/",
  });
  emitter.emit("iconManifest", {});
};
</script>

<template>
  <div class="logo" @click="handleClick">
    <img src="../assets/vue-icons.svg" alt="vue-icons-plus" width="60" />
    <span class="text">vue-icons</span>
  </div>
</template>

<style scoped>
.logo {
  color: #172b4d;
  cursor: pointer;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: filter;
  transition: filter 300ms;
}
.text {
  color: #e91e64;
  font-size: 32px;
  font-weight: 600;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
