<template>
    <div ref="materialRef">
        <MaterialItem v-for="(item, index) in components" :key="item.name + index" :name="item.name" />
    </div>
</template>

<script setup lang="ts">
import useComponentConfigStore from '@/store/componentConfig';
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import MaterialItem from './material-item.vue';

const componentConfigStore = useComponentConfigStore()
const { componentConfig } = storeToRefs(componentConfigStore)

const components = computed(() => {
    return Object.values(componentConfig.value).filter(item => item.name !== 'Page')
})

const materialRef = ref()



</script>

<style scoped></style>