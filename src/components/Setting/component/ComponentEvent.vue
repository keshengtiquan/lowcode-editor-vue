<template>
  <div v-if="curComponent">
    <a-dropdown
        placement="bottom"
        :trigger="['click']"
        class="my-[5px]"
        :arrow="false"
    >
      <a-button style="width: 100%">添加事件</a-button>
      <template #overlay>
        <a-menu>
          <a-menu-item
              v-for="setter in componentConfig[curComponent.name].eventSetter"
              @click="handleEvent({ name: setter.name, label: setter.label })"
          >
            {{ setter.label }}
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <a-collapse
        class="mt-2"
        v-model:activeKey="activeKey"
        expand-icon-position="end"
        :bordered="false"
    >
      <a-collapse-panel
          v-for="event in componentConfig[curComponent.name].events"
          :key="event.name"
          :header="event.label"
      >
        <div v-if="curComponent.props[event.name]?.actions.length > 0">
          <div
              class="bg-[#f7f7f9] p-2 mt-[5px] rounded-[5px]"
              v-for="(item, index) in curComponent.props[event.name].actions"
              :key="index"
          >
            <ActionsItem :action="item" @delete="deleteAction(event, index)" @edit="editAction(item, event)">
              <span v-if="item.actionType ==='goToLink'">跳转至 <span class="text-blue-500">{{ item.url }}</span></span>
              <span v-if="item.actionType ==='message'">提示消息 <span class="text-blue-500">{{
                  item.content
                }}</span></span>
              <span v-if="item.actionType === 'openModal'">打开弹窗 <span class="text-blue-500">{{ item.config.componentId }}</span></span>
            </ActionsItem>
          </div>
        </div>
        <template #extra>
          <PlusOutlined @click.stop="openModal(event)"/>
        </template>
      </a-collapse-panel>
    </a-collapse>
    <ActionModal v-model:open="actionModalOpen" :action="curAction" @cancel="onCancel" @submit="onSubmit"/>
  </div>
</template>
<script setup lang="ts">
import useComponentStore from "@/store/components.ts";
import useComponentConfigStore, {
  ComponentEvent,
} from "@/store/componentConfig.ts";
import {
  PlusOutlined,
} from "@ant-design/icons-vue";
import {storeToRefs} from "pinia";
import {ref} from "vue";
import ActionModal from "@/components/Setting/component/ActionModal.vue";
import ActionsItem from "@/components/Setting/actions/actionsItem.vue";

const componentStore = useComponentStore();
const componentConfigStore = useComponentConfigStore();
const {updateComponentProps} = componentStore;
const {curComponentId, curComponent} = storeToRefs(componentStore);
const {componentConfig} = storeToRefs(componentConfigStore);
const {addEvent} = componentConfigStore;
const activeKey = ref(["1"]);
const actionModalOpen = ref(false);
const curEvent = ref<ComponentEvent>();
const curAction = ref<any>()

const handleEvent = (event: any) => {
  addEvent(curComponent.value!.name, event);
};

const openModal = (event: ComponentEvent) => {
  curEvent.value = event;
  actionModalOpen.value = true;
};

const onSubmit = (value: any) => {
  if (!value) return;
  updateComponentProps(curComponentId.value!, {
    [curEvent.value!.name]: {
      actions: [
        ...(curComponent.value?.props[curEvent.value!.name]?.actions || []),
        value,
      ],
    },
  });
  curAction.value = null
};

const onCancel = () => {
  curAction.value = null
}

const deleteAction = (event: ComponentEvent, index: number) => {
  if (!event) return
  const actions = curComponent.value?.props[event.name].actions
  actions.splice(index, 1)
  updateComponentProps(curComponent.value!.id, {
    [event.name]: {
      actions: actions
    }
  })
}

const editAction = (config: any, event: any) => {
  curEvent.value = event;
  curAction.value = config
  actionModalOpen.value = true;
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
  padding: 8px;
  border-top: 1px solid #d4d6d9;
  border-bottom: 1px solid #d4d6d9;
}

:deep(.ant-collapse-borderless) > .ant-collapse-item > .ant-collapse-content {
  background-color: #fff;
}
</style>
