<template>
  <div class="p-3">
    <div class="border-[#e8e9eb] border-[1px]">
      <!-- <CssEditor @change="handleCodeChange" /> -->
      <Codemirror
        v-model="code"
        @change="handleCodeChange"
        style="height: 150px"
        :tab-size="2"
        :extensions="extensions"
      />
    </div>
    <a-form ref="formRef" :wrapper-col="{ span: 14 }">
      <a-collapse v-model:activeKey="activeKey">
        <a-collapse-panel
          v-for="(stylesSetter) in componentConfig[curComponent!.name].stylesSetter"
          :key="stylesSetter.group"
          :header="stylesSetter.title"
        >
          <div v-if="stylesSetter.group === 'layout'">
            <LayoutItem
              v-model:display="formState['display']"
              v-model:padding-top="formState['paddingTop']"
            />
          </div>
          <a-row v-else :gutter="10">
            <a-col v-for="setter in stylesSetter.setter" :span="setter.col">
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
import RenderFormItem from "./RenderFormItem.vue";
import LayoutItem from "./LayoutItem.vue";

const componentStore = useComponentStore();
const componentConfigStore = useComponentConfigStore();
const { updateComponentStyles } = componentStore;
const { curComponentId, curComponent } = storeToRefs(componentStore);
const { componentConfig } = storeToRefs(componentConfigStore);
const formState = reactive<any>({});
const formRef = ref<any>();
const code = ref(`.comp{\n\t\n}`);
const extensions = [css()];
const activeKey = ref(["1"]);

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
    Object.assign(formState, curComponent.value!.styles);

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
.ant-form-item {
  margin-bottom: 5px;
}
:deep(.ant-collapse-content-box) {
  padding: 5px !important;
}
</style>
