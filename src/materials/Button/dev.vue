<template>
    <a-button :data-component-id="id" :style="styles" :type="type">{{ text }}</a-button>
</template>

<script setup lang="ts">
import {CSSProperties} from "vue";

defineProps<{
    id: number,
    type?: string,
    text: string,
    styles: CSSProperties
}>()
</script>

<style scoped></style>