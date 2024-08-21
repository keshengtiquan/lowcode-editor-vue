<template>
    <div :data-component-id="id" :style="styles" class="p-[20px] bg-[#fff] h-full box-border">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import {CSSProperties} from "vue";

defineProps<{
    id: number
    styles: CSSProperties
}>()
</script>

<style scoped></style>