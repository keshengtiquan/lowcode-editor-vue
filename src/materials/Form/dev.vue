<template>
  <a-form :data-component-id="id" :data-name="name" :style="styles" class="w-full border-[1px] border-[#000] min-h-[300px] p-2">
    <slot></slot>
  </a-form>
</template>
<script setup lang="ts">
import {CSSProperties, onMounted} from "vue";

defineProps<{
  id: number;
  styles: CSSProperties;
  columns: any[];
  name: string
}>();

</script>

<style scoped>

</style>