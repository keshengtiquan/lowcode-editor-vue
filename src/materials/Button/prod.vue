<template>
    <a-button :style="styles" :type="type" v-bind="props">{{ text }}</a-button>
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