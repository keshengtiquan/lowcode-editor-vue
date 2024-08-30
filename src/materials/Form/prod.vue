<template>
  <a-form :data-component-id="id" :style="styles" class="w-full border-[1px] border-[#000]">
    <slot></slot>
  </a-form>
</template>
<script setup lang="ts">
import {CSSProperties} from "vue";

defineProps<{
  id: number;
  styles: CSSProperties;
  columns: any[];
}>();
</script>

<style scoped>

</style>