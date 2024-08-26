<template>
  <a-modal
    v-model:open="open"
    width="50%"
    okText="保存"
    cancelText="取消"
    style="top: 200px"
    title="编辑代码"
    @ok="handleOk"
  >
  <!-- <component :is="handleSolt"/> -->
    <MonacoEditor
      @change="onCodeChange"
      :defaultValue="defaultValue"
    />
  </a-modal>
</template>
<script setup lang="ts">
import {  h, ref } from "vue";
import MonacoEditor from "@/components/MonacoEditor/index.vue";
import { Button } from "ant-design-vue";
import { EnterOutlined } from "@ant-design/icons-vue";
const open = ref<boolean>(false);

const defaultValue = ref("");
const slotName = ref("");
const code = ref("");
const emit = defineEmits(["submit"]);

const onCodeChange = (value: string) => {
  code.value = value;
};

const showModal = (value: string, name: string) => {
  open.value = true;
  slotName.value = name;
  if (value) {
    defaultValue.value = value;
  }
};

const handleOk = () => {
  open.value = false;
  emit("submit", { name: slotName.value, code: code.value });
};

// const handleSolt = () => {
//   const hstring = 'h(Button, null, {default: [],icon: () => h(EnterOutlined)})'
//   const renderFunction = new Function('h','Button','EnterOutlined', `return ${hstring};`);
// console.log(renderFunction(h, Button, EnterOutlined));

//   return renderFunction(h, Button, EnterOutlined)
// };

defineExpose({ showModal });
</script>

<style scoped></style>
