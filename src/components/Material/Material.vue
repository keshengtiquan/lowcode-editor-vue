<template>
  <div>
    <MaterialItem
        v-for="(item, index) in components"
        :key="item.name + index"
        :desc="item.desc"
        :name="item.name"
    />
  </div>
</template>
<script setup lang="ts">
import MaterialItem from "@/components/Material/MaterialItem.vue";
import useComponentConfigStore from "@/store/componentConfig";
import {computed} from "vue";
import {storeToRefs} from "pinia";

const componentConfigStore = useComponentConfigStore();
const {componentConfig} = storeToRefs(componentConfigStore);

const components = computed(() => {
  return Object.values(componentConfig.value).filter(
      (item) => item.name !== "Page"
  );
});

</script>

<style scoped>

</style>