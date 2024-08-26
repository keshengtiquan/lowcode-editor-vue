<template>
    <a-button :style="styles" :type="type">{{ text }}<slot name="icon"></slot></a-button>
</template>

<script setup lang="ts">
import {CSSProperties} from "vue";

defineProps<{
    id: number,
    type?: string,
    text: string,
    styles: CSSProperties
    props: any
}>()
</script>

<style scoped></style>