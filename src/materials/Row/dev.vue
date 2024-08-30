<template>
  <a-row :data-component-id="id" :style="styles" class="w-full border-[1px] border-[#000] min-h-[100px]">
  </a-row>
</template>
<script setup lang="ts">
import {CSSProperties} from "vue/dist/vue";

defineProps<{
  id: number;
  styles: CSSProperties;
  columns: any[];
}>();
</script>

<style scoped>

</style>