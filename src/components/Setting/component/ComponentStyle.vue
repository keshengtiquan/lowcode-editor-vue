<template>
  <div class="p-3">
    <a-form ref="formRef" :wrapper-col="{ span: 14 }">
      <a-form-item
        v-for="setter in componentConfig[curComponent!.name].stylesSetter"
        :label="setter.label"
        :name="setter.name"
      >
        <a-input
          v-if="setter.type === 'input'"
          v-model:value="formState[setter.name]"
          size="small"
        />
        <a-select
          v-if="setter.type === 'select'"
          v-model:value="formState[setter.name]"
          :options="setter.options"
          size="small"
        />
        <a-input-number
          v-if="setter.type === 'inputNumber'"
          style="width: 100%"
          v-model:value="formState[setter.name]"
          size="small"
        />
      </a-form-item>
    </a-form>
    <div class="border-[#e8e9eb] border-[1px]">
      <!-- <CssEditor @change="handleCodeChange" /> -->
      <Codemirror
        v-model="code"
        @change="handleCodeChange"
        :tab-size="2"
        :extensions="extensions"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import useComponentStore from "@/store/components.ts";
import useComponentConfigStore from "@/store/componentConfig.ts";
import { storeToRefs } from "pinia";
import { watch, ref, reactive } from "vue";
import { bus } from "@/utils/eventBus.ts";
import { debounce } from "lodash-es";
import styleToObject from "style-to-object";
import { Codemirror } from "vue-codemirror";
import { css } from "@codemirror/lang-css";
import { toCSSStr } from "@/utils";

const componentStore = useComponentStore();
const componentConfigStore = useComponentConfigStore();
const { updateComponentStyles } = componentStore;
const { curComponentId, curComponent } = storeToRefs(componentStore);
const { componentConfig } = storeToRefs(componentConfigStore);
const formState = reactive<any>({});
const formRef = ref<any>();
const code = ref(`.comp{\n\t\n}`);
const extensions = [css()];

const handleCodeChange = debounce((value: string) => {
  // console.log(value);

  let css: Record<string, any> = {};

  try {
    const cssStr = value
      .replace(/\/\*.*\*\//, "") // 去掉注释 /** */
      .replace(/(\.?[^{]+{)/, "") // 去掉 .comp {
      .replace("}", ""); // 去掉 }

    styleToObject(cssStr, (name, value) => {
      css[name.replace(/-\w/, (item) => item.toUpperCase().replace("-", ""))] =
        value;
    });

    updateComponentStyles(
      +curComponentId.value!,
      { ...formState, ...css },
      true
    );
  } catch (e) {}
}, 500);

watch(formState, (newData) => {
  updateComponentStyles(+curComponentId.value!, newData);
  bus.emit("updatePosition", newData);
});

watch(
  () => curComponent.value,
  () => {
    for (const key in formState) {
      if (formState.hasOwnProperty(key)) {
        delete formState[key];
      }
    }
    // console.log(formState);

    Object.assign(formState, curComponent.value!.styles);

    // console.log(curComponent.value?.styles);
    // console.log(toCSSStr(curComponent.value?.styles));

    code.value = toCSSStr(curComponent.value?.styles);
  },
  { immediate: true }
);
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
