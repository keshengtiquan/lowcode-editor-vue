<template>
  <a-form :model="formState" :label-col="{style: { width: '100px' }}" :wrapper-col="{span: 14}">
    <a-form-item label="页面地址">
      <a-textarea v-model:value="formState.url" :rows="4"/>
    </a-form-item>
    <a-form-item label="打开方式">
      <a-select
          ref="select"
          v-model:value="formState.target"
          style="width: 120px"
      >
        <a-select-option value="_blank">_blank</a-select-option>
        <a-select-option value="_self">_self</a-select-option>
        <a-select-option value="_parent">_parent</a-select-option>
        <a-select-option value="_top">_top</a-select-option>
      </a-select>
    </a-form-item>
  </a-form>
</template>
<script setup lang="ts">

import {reactive} from "vue";

const formState = reactive({
  url: '',
  target: '_blank'
})



</script>

<style scoped>

</style>