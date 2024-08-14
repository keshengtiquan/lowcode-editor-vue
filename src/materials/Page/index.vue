<template>
    <div ref="pageRef" :data-component-id="id" class="p-[20px] h-[100%]  box-border">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    id: string
}>()
</script>

<style scoped></style>