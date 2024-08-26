export const installCode = `yarn add vue-icons-plus
# or
npm install vue-icons-plus --save`;

export const example = {
  vue3: `<script setup lang="ts">
  import { SlActionRedo } from "vue-icons-plus/sl";
</script>

<template>
  <SlActionRedo />
</template>`,
  vue2: `<script>
  import { SlActionRedo } from "vue-icons-plus/sl";
  export default {
    components: {
      SlActionRedo
    }
  }
 </script>

<template>
  <SlActionRedo />
</template>`,
  uniapp: `<template>
  <view>
    <AiFillAccountBook />
  </view>
</template>

<script lang="uts">
  import { BiSearch } from 'vue-icons-plus/bi';
  export default {
    components: {
      BiSearch
    },
  }
</script>`,
}