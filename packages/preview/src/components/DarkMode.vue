<script setup lang="ts">
import useTheme from "../hooks/useTheme";
import { BiSun } from "vue-icons-plus/bi";
import { AiFillMoon } from "vue-icons-plus/ai";

const { currentTheme, switchTheme } = useTheme();
</script>

<template>
  <button
    type="button"
    aria-label="Toggle dark mode"
    class="icon-button"
    @click="switchTheme()"
  >
    <transition
      enter-active-class="transition duration-200 ease-out"
      leave-active-class="transition duration-200 ease-in"
      :enter-from-class="
        currentTheme === 'dark'
          ? 'transform -translate-y-full scale-50 opacity-0'
          : 'transform translate-y-full scale-50 opacity-0'
      "
      enter-to-class="transform translate-y-0"
      leave-from-class="transform translate-y-0"
      :leave-to-class="
        currentTheme === 'dark'
          ? 'transform translate-y-full scale-50 opacity-0'
          : 'transform -translate-y-full scale-50 opacity-0'
      "
      mode="out-in"
    >
      <AiFillMoon v-if="currentTheme === 'dark'" :size="20" />
      <BiSun v-else :size="20" />
    </transition>
  </button>
</template>
