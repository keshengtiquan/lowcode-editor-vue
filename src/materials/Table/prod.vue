<template>
  <div  :style="styles" >
    <a-table :columns="columns">
    </a-table>
  </div>
</template>
<script setup lang="ts">
import {CSSProperties} from "vue";

const props = defineProps<{
  styles: CSSProperties,
  columns: any[],
  request: string
}>()

console.log(props.request);

</script>

<style scoped>

</style>