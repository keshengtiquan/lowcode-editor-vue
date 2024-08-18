<template>
    <div :style="styles">
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