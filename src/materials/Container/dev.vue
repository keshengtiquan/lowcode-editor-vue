<template>
    <div draggable="true" :data-component-id="id" :style="styles" class="border-[1px] border-[#000] min-h-[100px] p-[20px]">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import {CSSProperties} from "vue";

defineProps<{
    id: number,
    styles: CSSProperties
}>()
</script>

<style scoped></style>