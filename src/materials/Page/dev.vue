<template>
    <div id="page" :data-component-id="id" :style="styles" class="aa  overflow-auto bg-[#fff]">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import {CSSProperties, onMounted} from "vue";
import {bus} from "@/utils/eventBus.ts";

defineProps<{
    id: number
    styles: CSSProperties
}>()
onMounted(() => {
  document.getElementById('page')?.addEventListener("scroll", () => {
    bus.emit('pageScroll')
  })
})
</script>

<style scoped>
.aa {
  height: calc(100vh - 60px);
}
</style>