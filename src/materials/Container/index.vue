<template>
    <div :data-component-id="id" class="border-[1px] border-[#000] min-h-[100px] p-[20px]">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    id: string
}>()
</script>

<style scoped></style>