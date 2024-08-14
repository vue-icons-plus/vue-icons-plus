<template>
  <div class="search">
    <input
      type="text"
      aria-label="search"
      placeholder="🔍 Search Icons"
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      @input="handleSearch"
      value=""
    />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { debounce } from "radash";

const router = useRouter();
const handleSearch = debounce({ delay: 500 }, (e) => {
  const value = e.target.value;
  router.push({
    path: `/icons/search/`,
    query: {
      q: value,
    },
  });
});
</script>

<style scoped>
.search {
  padding: var(--space-2);
}
.search input {
  width: 200px;
  line-height: 36px;
  font-size: 1.2rem;
  padding: 0 0.75rem;
  color: var(--color-black);
  border-radius: var(--border-radius-md);
  border: 2px solid var(--color-gray-3);
  background: var(--color-gray-2);
  outline: none;
}
</style>
