<template>
  <Codemirror v-model="code" @change="onChange"    :tab-size="2" :style="{ height: '250px' }" :extensions="extensions"/>
</template>
<script setup lang="ts">
import { Codemirror } from 'vue-codemirror'
import {css} from "@codemirror/lang-css";
import {ref} from 'vue'

const emit = defineEmits(['change'])
const code = ref(`.comp{\n\t\n}`)
const extensions = [css()]
const onChange = () => {
  emit('change', code.value)
}
</script>
<style scoped>

</style>