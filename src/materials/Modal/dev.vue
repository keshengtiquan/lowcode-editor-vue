<template>
  <div :data-component-id="id" :style="styles" class="min-h-[100px] p-[20px] border-[1px] border-[#000]">
    <h4>{{title}}</h4>
    <slot />
  </div>
</template>
<script setup lang="ts">
import {CSSProperties} from "vue";

defineProps<{
  id: number,
  styles: CSSProperties,
  title: string
}>()
</script>

<style scoped>

</style>