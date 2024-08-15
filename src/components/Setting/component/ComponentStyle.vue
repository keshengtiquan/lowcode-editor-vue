<template>
  <div class="p-3">
    <a-form ref="formRef"  :wrapper-col="{ span: 14 }">
      <a-form-item v-for="setter in componentConfig[curComponent!.name].stylesSetter" :label="setter.label">
        <a-input v-if="setter.type === 'input'" v-model:value="formState[setter.name]"/>
        <a-select v-if="setter.type === 'select'" v-model:value="formState[setter.name]" :options="setter.options"/>
        <a-input-number v-if="setter.type ==='inputNumber'" style="width: 100%" v-model:value="formState[setter.name]" />
      </a-form-item>
    </a-form>
    <CssEditor @change="handleCodeChange"/>
  </div>
</template>
<script setup lang="ts">
import useComponentStore from "@/store/components.ts";
import useComponentConfigStore from "@/store/componentConfig.ts";
import {storeToRefs} from "pinia";
import {watch, ref, onMounted, reactive} from "vue";
import {bus} from "@/utils/eventBus.ts";
import CssEditor from "@/components/Setting/component/CssEditor.vue";

const componentStore = useComponentStore()
const componentConfigStore = useComponentConfigStore()
const {updateComponentStyles} = componentStore
const {curComponentId, curComponent} = storeToRefs(componentStore)
const {componentConfig} = storeToRefs(componentConfigStore)
const formState = reactive<any>({})
const formRef = ref()

const handleCodeChange = (code: string) => {
  console.log(code)
}

watch(formState, (newData) => {
  updateComponentStyles(+curComponentId.value!, newData)
  bus.emit('updatePosition', newData)
})

watch(() => curComponent.value, () => {
  Object.assign(formState, curComponent.value!.styles)
}, {immediate: true})

onMounted(() => {
  console.log(formRef.value)
})
</script>
<style scoped>
:deep(.ant-row) {
  justify-content: space-between !important;
}
:deep(.ant-form-item .ant-form-item-label) > label {
  color: #78797e;
  font-size: 14px;
}
</style>