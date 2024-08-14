<template>
    <el-button :data-component-id="id" :type="type" class="">{{ text }}</el-button>
</template>

<script setup lang="ts">
defineProps<{
    id: string,
    type?: string,
    text: string
}>()
</script>

<style scoped></style>