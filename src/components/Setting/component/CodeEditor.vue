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
    <MonacoEditor
      @change="onCodeChange"
      language="html"
      :defaultValue="defaultValue"
    />
  </a-modal>
</template>
<script setup lang="ts">
import { ref } from "vue";
import MonacoEditor from "@/components/MonacoEditor/index.vue";
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
  console.log(code.value)
  console.log(defaultValue.value)
  emit("submit", { name: slotName.value, code: code.value });
};



defineExpose({ showModal });
</script>

<style scoped></style>
