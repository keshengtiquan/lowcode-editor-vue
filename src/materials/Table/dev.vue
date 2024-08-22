<template>
  <div :data-component-id="id" :style="styles" class="w-full border-[1px] border-[#000]">
    <a-table :columns="columns" >
    </a-table>
  </div>
</template>
<script setup lang="ts">
import { CSSProperties} from "vue";

defineProps<{
  id: number,
  styles: CSSProperties,
  columns: any[]
}>()


</script>

<style scoped>

</style>