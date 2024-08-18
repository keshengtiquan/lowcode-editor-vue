<template>
    <div draggable="true" :name="name" class=" border-dashed
            border-[1px]
            border-[#000]
            py-[8px] px-[10px] 
            m-[10px]
            cursor-move
            inline-block
            bg-white
            hover:bg-[#ccc]">
        {{ desc }}
    </div>
</template>

<script setup lang="ts">
defineProps<{
    name: string,
    desc: string
}>()

</script>

<style scoped></style>