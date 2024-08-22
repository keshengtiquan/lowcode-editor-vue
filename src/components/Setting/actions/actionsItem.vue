<template>
  <div>
    <div class="flex justify-between h-[25px]">
      <span class="leading-[20px]">{{ title }}</span>
      <div class="text-[#84868b]">
        <SettingOutlined @click="emit('edit')" class="mr-1 cursor-pointer"/>
        <DeleteOutlined @click="emit('delete')" class="cursor-pointer"/>
      </div>
    </div>
    <div v-if="action.actionType !== 'customJS'" class="text-[#84868c] h-[20px]">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import {DeleteOutlined, SettingOutlined} from "@ant-design/icons-vue";
import {computed} from "vue";

const emit = defineEmits(['delete', 'edit'])
const props = defineProps<{
  action: { actionType: string } | any
}>()
const titleMap: Record<string, string> = {
  goToLink: '跳转链接',
  message: '消息提醒',
  customJS: '自定义JS',
  openModal: '打开弹窗'
}
const title = computed(() => {
  return titleMap[props.action.actionType]
})


</script>
<style scoped>

</style>