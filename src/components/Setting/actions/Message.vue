<template>
  <a-form :model="formState" :label-col="{style: { width: '150px' }}" :wrapper-col="{span: 14}">
    <a-form-item label="消息类型" name="type">
      <a-radio-group v-model:value="formState.type" button-style="solid">
        <a-radio-button value="info">提示</a-radio-button>
        <a-radio-button value="warning">警告</a-radio-button>
        <a-radio-button value="success">成功</a-radio-button>
        <a-radio-button value="error">失败</a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="消息内容" name="content">
      <a-textarea v-model:value="formState.content" @change="contentChange" :rows="4"/>
    </a-form-item>
    <a-form-item label="持续时间(s)" name="duration" >
      <a-input-number v-model:value="formState.duration" :min="0"/>
    </a-form-item>
  </a-form>
</template>
<script setup lang="ts">
import {reactive} from "vue";

const emit = defineEmits(['change'])

const props = defineProps<{
  defaultValue: {type: string, content: string, duration: number}
}>()

const formState = reactive({
  type: props.defaultValue?.type || 'info',
  content: props.defaultValue?.content || '',
  duration: props.defaultValue?.duration || 3
})

const contentChange = () => {
  emit('change', {actionType: 'message', ...formState})
}
</script>

<style scoped>

</style>