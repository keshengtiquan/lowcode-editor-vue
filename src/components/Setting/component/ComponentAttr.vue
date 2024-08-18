<template>
  <div class="p-3">
    <a-form ref="formRef" :wrapper-col="{ span: 14 }">
      <a-form-item label="组件ID">
        <a-input size="small" disabled v-model:value="formState.id"/>
      </a-form-item>
      <a-form-item label="组件名称">
        <a-input size="small" disabled v-model:value="formState.name"/>
      </a-form-item>
      <a-form-item label="组件描述">
        <a-input size="small" disabled v-model:value="formState.desc"/>
      </a-form-item>
      <a-form-item v-for="setter in componentConfig[formState.name].setter" :label="setter.label">
        <a-input v-if="setter.type === 'input'"  size="small" v-model:value="formState[setter.name]"/>
        <a-select v-if="setter.type === 'select'" size="small" v-model:value="formState[setter.name]" :options="setter.options"/>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import useComponentStore from "@/store/components.ts";
import useComponentConfigStore from "@/store/componentConfig.ts";
import {storeToRefs} from "pinia";
import {watch, ref, reactive} from "vue";
import { bus } from "@/utils/eventBus";

const componentStore = useComponentStore()
const componentConfigStore = useComponentConfigStore()
const {updateComponentProps} = componentStore
const {curComponentId, curComponent} = storeToRefs(componentStore)
const {componentConfig} = storeToRefs(componentConfigStore)
const formState = reactive<any>({
  id: curComponent.value!.id,
  name: curComponent.value!.name,
  desc: curComponent.value!.desc,
})
const formRef = ref()

watch(formState, (newData) => {
  updateComponentProps(+curComponentId.value!, newData)
  bus.emit('componentAttr')
})

watch(() => curComponent.value, () => {
  formState.id = curComponent.value!.id
  formState.name = curComponent.value!.name
  formState.desc = curComponent.value!.desc
  Object.assign(formState, curComponent.value!.props)
}, {immediate: true})

</script>
<style scoped>
:deep(.ant-row) {
  justify-content: space-between !important;
}
:deep(.ant-form-item .ant-form-item-label) > label {
  color: #78797e;
  font-size: 14px;
}
.ant-form-item {
  margin-bottom: 10px;
}
</style>