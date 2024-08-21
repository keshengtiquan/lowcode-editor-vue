<template>
  <a-modal v-model:open="open" title="事件动作配置" destroyOnClose cancelText="取消" okText="确定" width="50%" @cancel="handleCancel" @ok="handleOk">
    <div class="flex border-[#e8e9eb] border-[1px] rounded-[5px]">
      <div class="w-[150px] h-[480px] border-r-[1px]">
        <div>
          <div class="text-[12px] font-bold px-[16px] pt-[16px] pb-[12px] border-b-[#e8e9eb] border-b-[1px]">
            执行动作
          </div>
        </div>
        <a-menu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" mode="inline" @click="handleMenuClick">
          <a-sub-menu key="page" title="页面">
            <a-menu-item key="goToLink">跳转链接</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="modal" title="弹窗消息">
            <a-menu-item key="openModal">打开弹窗</a-menu-item>
            <a-menu-item key="message">消息提醒</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="other" title="其他">
            <a-menu-item key="customJS">自定义JS</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </div>
      <div class="flex-1">
        <div class="font-bold mt-[16px] mx-[16px] mb-[12px] text-[12px]">动作说明</div>
        <span class="text-[12px] text-[#5c5f66] ml-[16px]">{{Instructions[curAction]}}</span>
        <div class="font-bold mt-[16px] mx-[16px] mb-[12px] text-[12px]">基础设置</div>
        <div class="mx-[16px] p-[16px]">
          <GoToLink v-if="curAction === 'goToLink'" :default-value="defaultValue" @change="handleChange"/>
          <Message v-else-if="curAction === 'message'" :default-value="defaultValue" @change="handleChange"/>
          <CustomJS v-else-if="curAction === 'customJS'" :default-value="defaultValue" @change="handleChange"/>
          <a-empty style="color: #5c5f66" description="无配置内容" v-else/>
        </div>
      </div>
    </div>
  </a-modal>
</template>
<script setup lang="ts">
import {computed, ref, watch} from "vue";
import GoToLink from "@/components/Setting/actions/GoToLink.vue";
import Message from '../actions/Message.vue'
import CustomJS from '../actions/CustomJS.vue'

const Instructions: Record<string, string> = {
  goToLink: '跳转至指定链接的页面',
  openModal: '打开弹窗，弹窗内支持复杂的交互设计',
  message: '弹出消息提醒',
  customJS: '通过JavaScript自定义动作逻辑'
}

const props = defineProps<{
  open: boolean,
  action: any
}>()
const emit = defineEmits(['update:open', 'submit', 'cancel'])
const curAction = ref('goToLink')
const selectedKeys = ref(['goToLink'])
const openKeys = ref(['page', 'modal', 'other'])
const curConfig = ref()
const defaultValue = ref()
const open = computed({
  set(value: any) {
    emit('update:open', value)
  },
  get() {
    return props.open
  }
})

const handleChange = (value: any) => {
  curConfig.value = value
}

const handleMenuClick = ({key}: {key: string}) => {
  curAction.value = key
}

const handleOk = () => {
  emit('submit', curConfig.value)
  open.value = false;
};

const handleCancel = () => {
  emit('cancel')
}

watch(() => open.value, (newVal) => {
  console.log(newVal, props.action)
  if(newVal && props.action) {
    console.log(85)
    selectedKeys.value = [props.action.actionType]
    curAction.value = props.action.actionType
    const {actionType, ...other} = props.action
    defaultValue.value = other
  }else {
    defaultValue.value = null
    selectedKeys.value = ['goToLink']
    curAction.value = 'goToLink'
  }
})
</script>

<style lang="scss" scoped>
:deep(.ant-menu) {
  font-size: 12px;

  .ant-menu-submenu {
    border-radius: 0 !important;
  }

  .ant-menu-submenu-title {
    border-radius: 0;
  }

  .ant-menu-item {
    border-radius: 0;
  }
}

:deep(.ant-menu-inline) {
   > .ant-menu-submenu > .ant-menu-submenu-title {
    height: 30px;
    line-height: 30px;
    margin-inline: 0;
    margin-block: 0;
    width: 100%;
    padding-inline: 16px !important;
  }

   .ant-menu-item {
    height: 30px;
    line-height: 30px;
    margin-inline: 0;
    margin-block: 0;
    width: 100%;
    padding-inline: 32px !important;
  }

  padding-left: 0 !important;

}

.ant-menu-light.ant-menu-root.ant-menu-inline {
  border-inline-end: none;
}

:deep(.ant-form-item) .ant-form-item-label > label {
  font-size: 12px;
  //height: 20px;
  color: #5c5f66;
}
</style>