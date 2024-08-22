<template>
  <div>
    <a-form ref="formRef" :wrapper-col="{ span: 14 }">
      <a-collapse
          class="mt-2"
          v-model:activeKey="activeKey"
          expand-icon-position="end"
          :bordered="false"
      >
        <a-collapse-panel
            key="1"
            header="系统"
        >
          <a-form-item label="组件ID">
            <a-input size="small" disabled v-model:value="formState.id"/>
          </a-form-item>
          <a-form-item label="组件名称">
            <a-input size="small" disabled v-model:value="formState.name"/>
          </a-form-item>
          <a-form-item label="组件描述">
            <a-input size="small" disabled v-model:value="formState.desc"/>
          </a-form-item>
        </a-collapse-panel>
        <a-collapse-panel class="pt-[5px]" v-for="(attrSetter, index) in componentConfig[formState.name].attrSetter" :key="index + 2"
                          :header="attrSetter.title">
          <a-form-item v-for="setter in attrSetter.setter" :label="setter.label">

            <a-input v-if="setter.type === 'input'" size="small" v-model:value="formState[setter.name]"/>
            <a-select v-if="setter.type === 'select'" size="small" v-model:value="formState[setter.name]"
                      :options="setter.options"/>
          </a-form-item>
        </a-collapse-panel>
      </a-collapse>


    </a-form>
  </div>
</template>
<script setup lang="ts">
import useComponentStore from "@/store/components.ts";
import useComponentConfigStore from "@/store/componentConfig.ts";
import {storeToRefs} from "pinia";
import {watch, ref, reactive} from "vue";
import {bus} from "@/utils/eventBus";

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
const activeKey = ref(["1"]);

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
<style lang="scss" scoped>
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

:deep(.ant-collapse) {
  border-radius: 0;
  font-size: 12px;
}

.ant-collapse > :deep(.ant-collapse-item:last-child) > .ant-collapse-header {
  border-radius: 0;

  .ant-collapse-expand-icon {
    height: 18px;
  }
}

.ant-collapse > :deep(.ant-collapse-item:last-child) {
  border-radius: 0;
}

:deep(.ant-collapse-item) > .ant-collapse-header {
  padding: 8px;
  border-top: 1px solid #d4d6d9;
  border-bottom: 1px solid #d4d6d9;
}

:deep(.ant-collapse-borderless) > .ant-collapse-item > .ant-collapse-content {
  background-color: #fff;
}
</style>