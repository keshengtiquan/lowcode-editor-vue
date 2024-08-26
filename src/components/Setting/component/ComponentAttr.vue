<template>
  <div>
    <a-form ref="formRef" :wrapper-col="{ span: 14 }">
      <a-collapse
        class="mt-2"
        v-model:activeKey="activeKey"
        expand-icon-position="end"
        :bordered="false"
      >
        <a-collapse-panel key="1" header="系统">
          <a-form-item label="组件ID">
            <a-input size="small" disabled v-model:value="formState.id" />
          </a-form-item>
          <a-form-item label="组件名称">
            <a-input size="small" disabled v-model:value="formState.name" />
          </a-form-item>
          <a-form-item label="组件描述">
            <a-input size="small" disabled v-model:value="formState.desc" />
          </a-form-item>
        </a-collapse-panel>
        <a-collapse-panel
          v-for="(attrSetter, index) in componentConfig[formState.name]
            .attrSetter"
          :key="index + 2"
          :header="attrSetter.title"
        >
          <TableColumn
            v-if="attrSetter.group === 'tableColumn'"
            :columns="cloneDeep(curComponent?.props.columns)"
          />
          <a-row v-else :gutter="10">
            <a-col v-for="setter in attrSetter.setter" :span="setter.col || 24">
              <a-form-item :label="setter.label" :name="setter.name">
                <RenderFormItem
                  :setter="setter"
                  v-model="formState[setter.name]"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-collapse-panel>
      </a-collapse>
    </a-form>
    <a-collapse
      v-model:activeKey="activeKey"
      expand-icon-position="end"
      :bordered="false"
    >
      <a-collapse-panel key="" header="插槽">
        <div
          class="flex items-center justify-start"
          v-for="slot in componentConfig[formState.name].slots"
          :key="slot.name"
        >
          <span class="w-3/5 text-[14px]"
            >{{ slot.label }} -- {{ slot.name }}</span
          >
          <a-button
            @click="
              codeEditorRef.showModal(
                `<template #${slot.name}${
                  slot.params ? `='{${slot.params.join(',')}}'` : ''
                }>\n\t\n</template>`,
                slot.name
              )
            "
            >编辑代码</a-button
          >
        </div>
      </a-collapse-panel>
    </a-collapse>
    <CodeEditor ref="codeEditorRef" @submit="onCodeSubmit" />
  </div>
</template>
<script setup lang="ts">
import useComponentStore from "@/store/components.ts";
import useComponentConfigStore from "@/store/componentConfig.ts";
import { storeToRefs } from "pinia";
import { watch, ref, reactive } from "vue";
import { bus } from "@/utils/eventBus";
import RenderFormItem from "./RenderFormItem.vue";
import TableColumn from "./TableColumn.vue";
import { cloneDeep } from "lodash-es";
import CodeEditor from "./CodeEditor.vue";

const componentStore = useComponentStore();
const componentConfigStore = useComponentConfigStore();
const { updateComponentProps, updateComponentSlots } = componentStore;
const { curComponentId, curComponent } = storeToRefs(componentStore);
const { componentConfig } = storeToRefs(componentConfigStore);
const formState = reactive<any>({
  id: curComponent.value!.id,
  name: curComponent.value!.name,
  desc: curComponent.value!.desc,
});
const formRef = ref();
const activeKey = ref(["1"]);
const codeEditorRef = ref();

watch(formState, (newData) => {
  updateComponentProps(+curComponentId.value!, newData);

  bus.emit("componentAttr");
});

watch(
  () => curComponent.value,
  () => {
    for (const key in formState) {
      if (formState.hasOwnProperty(key)) {
        formState[key] = "";
      }
    }
    formState.id = curComponent.value!.id;
    formState.name = curComponent.value!.name;
    formState.desc = curComponent.value!.desc;

    Object.assign(formState, curComponent.value!.props);
  },
  { immediate: true }
);

const onCodeSubmit = (value: string) => {
  updateComponentSlots(+curComponentId.value!, [value])
};
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
  padding: 4px;
  border-top: 1px solid #d4d6d9;
  border-bottom: 1px solid #d4d6d9;
  line-height: 22px;
}

:deep(.ant-collapse-borderless) > .ant-collapse-item {
  border-bottom: none;

  > .ant-collapse-content {
    background-color: #fff;
  }
}
</style>
