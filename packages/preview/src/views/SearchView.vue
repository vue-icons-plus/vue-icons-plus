<script setup lang="ts">
import { IconsManifest } from "vue-icons-plus";
import { reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import SearchIconSet from "../components/SearchIconSet.vue";

const route = useRoute();
const queryId = ref("");
const manifest = reactive(IconsManifest);
watch(
  () => route.query.q,
  (q) => {
    queryId.value = query.q;
  }
);
</script>

<template>
  <div class="main">
    <div class="main-title">🔍 Search</div>
    <div class="main-content">
      <h2 class="sub-title" v-if="queryId.length <= 2">
        Please enter at least 3 characters to search...
      </h2>
      <div v-else>
        <h2 class="sub-title">Results for: {{ queryId }}</h2>
        <div class="icon-box">
          <template v-for="icon of manifest">
            <SearchIconSet class="and" :queryId="queryId" :icon="icon" />
          </template>
        </div>
        <h3 class="no-results"></h3>
      </div>
    </div>
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
  margin-bottom: var(--space-2);
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
.icon-box:empty + .no-results:after {
  content: "No icons found";
}
</style>
