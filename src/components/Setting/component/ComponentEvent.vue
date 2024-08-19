<template>
  <div v-if="curComponent" class="p-2">
    <a-dropdown placement="bottom" :trigger="['click']" class="my-[5px]" :arrow="false" >
      <a-button style="width: 100%;">添加事件</a-button>
      <template #overlay>
        <a-menu>
          <a-menu-item v-for="setter in componentConfig[curComponent.name].eventSetter"
                       @click="handleEvent({name: setter.name, label: setter.label})">
            {{ setter.label }}
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <a-collapse class="mt-2" v-model:activeKey="activeKey" expand-icon-position="end">
      <a-collapse-panel v-for="event in componentConfig[curComponent.name].events" :key="event.name"
                        :header="event.label">
        <div>
          <div class="flex items-center ">
            <div class="w-[100px]">动作:</div>
            <a-select style="width: 100%" @change="(value: string) => selectAction(event.name, value)"
                      :value="curComponent.props[event.name]?.type" :options="[
              {label: '显示提示', value: 'showMessage'},
              {label: '跳转链接', value: 'goToLink'}
          ]"></a-select>
          </div>
          <GoToLink v-if="curComponent.props[event.name]?.type === 'goToLink'" :event="event"/>
        </div>
        <template #extra>
          <PlusOutlined @click.stop="openModal"/>
        </template>
      </a-collapse-panel>
    </a-collapse>
    <ActionModal v-model:open="actionModalOpen"/>
  </div>
</template>
<script setup lang="ts">
import useComponentStore from "@/store/components.ts";
import useComponentConfigStore from "@/store/componentConfig.ts";
import {PlusOutlined} from '@ant-design/icons-vue'
import {storeToRefs} from "pinia";
import {ref} from 'vue'
import GoToLink from "@/components/Setting/actions/GoToLink.vue";
import ActionModal from "@/components/Setting/component/ActionModal.vue";

const componentStore = useComponentStore()
const componentConfigStore = useComponentConfigStore()
const {updateComponentProps} = componentStore
const {curComponentId, curComponent} = storeToRefs(componentStore)
const {componentConfig} = storeToRefs(componentConfigStore)
const {addEvent} = componentConfigStore
const activeKey = ref(['1']);
const actionModalOpen = ref(false)

const selectAction = (eventName: string, value: string) => {
  if (!curComponentId.value) return
  updateComponentProps(+curComponentId.value, {[eventName]: {type: value}})
}

const handleEvent = (event: any) => {
  addEvent(curComponent.value!.name, event)
}

const openModal = () => {
  actionModalOpen.value = true
}



</script>

<style lang="scss" scoped>
:deep(.ant-collapse) {
  border-radius: 0;
  font-size: 12px;
}


.ant-collapse > :deep(.ant-collapse-item:last-child) > .ant-collapse-header {
  border-radius: 0;
  .ant-collapse-expand-icon {
    height: 18px;
  }
}

.ant-collapse > :deep(.ant-collapse-item:last-child) {
  border-radius: 0;
}

:deep(.ant-collapse-item) > .ant-collapse-header {
  padding: 3px 5px;
}

</style>