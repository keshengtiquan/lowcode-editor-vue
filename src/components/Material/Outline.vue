<template>
    <a-tree
        :tree-data="components"
        :field-names="{title: 'desc', key: 'id'}"
        defaultExpandAll
        :showLine="{showLeafIcon: false}"
        @select="([selectedKeys]: number[]) => {
          setCurComponentId(selectedKeys)
        }"
    >
    </a-tree>
</template>
<script setup lang="ts">
import useComponentStore from "@/store/components.ts";
import {storeToRefs} from "pinia";

const componentStore = useComponentStore()

const {components} = storeToRefs(componentStore)
const {setCurComponentId} = componentStore

</script>

<style scoped>

</style>