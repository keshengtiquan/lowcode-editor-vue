<template>
  <a-form :model="formState" :label-col="{style: { width: '150px' }}" :wrapper-col="{span: 14}">
    <a-form-item label="页面地址">
      <a-tree-select
          v-model:value="formState.componentId"
          style="width: 100%"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          placeholder="Please select"
          allow-clear
          tree-default-expand-all
          :fieldNames="{label: 'name', value: 'id'}"
          :tree-data="components"
          @change="onChange"
      >
      </a-tree-select>
    </a-form-item>
    <a-form-item label="方法">
      <a-select
          ref="select"
          v-model:value="formState.method"
          style="width: 120px"
          @change="onSelectChange"
      >
        <a-select-option v-for="method in componentConfig[selectedComponent?.name || '']?.methods" :value="method.name">{{ method.label}}</a-select-option>
      </a-select>
    </a-form-item>
  </a-form>
</template>
<script setup lang="ts">
import {reactive, ref} from "vue";
import useComponentStore, {Component} from "@/store/components.ts";
import useComponentConfigStore from "@/store/componentConfig.ts";
import {storeToRefs} from "pinia";
import {getComponentById} from "@/utils";

const {components} = storeToRefs(useComponentStore())
const {componentConfig} = storeToRefs(useComponentConfigStore())
const selectedComponent = ref<Component | null>()

const props = defineProps<{
  defaultValue: { config: {componentId: number, method: string} }
}>()

const emit = defineEmits(['change'])

const formState = reactive({
  componentId: props.defaultValue?.config.componentId || undefined,
  method: props.defaultValue?.config.method || ''
})

const onChange = (value: number) => {
  selectedComponent.value = getComponentById(value, components.value)
}
const onSelectChange = () => {
  emit('change', {actionType: 'openModal', config: formState})
}


</script>

<style scoped>

</style>