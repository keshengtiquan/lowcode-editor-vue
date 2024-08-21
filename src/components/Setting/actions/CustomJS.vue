<template>
  <div ref="monacoEditor" style="height: 300px; border: 1px solid #e8e9ef"></div>
</template>
<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref} from "vue";
import * as monaco from 'monaco-editor'

const props = defineProps<{
  defaultValue?: {code: string}
}>()
const monacoEditor = ref()
let editor: monaco.editor.IStandaloneCodeEditor
const emit = defineEmits(['change'])
const init = () => {
  editor = monaco.editor.create(monacoEditor.value, {
    value: props.defaultValue?.code || '',
    language: 'javascript',
    minimap: {
      enabled: false
    },
    tabSize: 2,
    fontSize: 14,
    scrollBeyondLastLine: false,
    scrollbar: {
      verticalScrollbarSize: 6,
      horizontalScrollbarSize: 6,
    },
  });

  // 监听值的变化
  editor.onDidChangeModelContent(() => {
    const value = editor.getValue()
    emit('change', {actionType: 'customJS', code: value})
  })
}

onMounted(async () => {
  init()
});
onBeforeUnmount(() => {
  editor.dispose()
})
</script>

<style scoped>

</style>