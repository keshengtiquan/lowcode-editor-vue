<template>
  <div>
    <a-segmented v-model:value="value" size="large" block :options="data"/>
    <template v-if="curComponentId">
      <ComponentAttr v-if="value === '属性'"/>
      <ComponentStyle v-if="value === '外观'"/>
      <ComponentEvent v-if="value === '事件'"/>
    </template>

  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue';
import ComponentAttr from "@/components/Setting/component/ComponentAttr.vue";
import ComponentEvent from "@/components/Setting/component/ComponentEvent.vue";
import ComponentStyle from "@/components/Setting/component/ComponentStyle.vue";
import useComponentStore from "@/store/components.ts";
import {storeToRefs} from "pinia";

const {curComponentId} = storeToRefs(useComponentStore())

const data = reactive(['属性', '外观', '事件']);
const value = ref(data[0]);
</script>

<style scoped>

</style>