<template>
  <div>
    <a-button @click="addColumn" type="link" size="small"
      ><PlusOutlined />添加列</a-button
    >
    <ul ref="el">
        <li
          class="flex items-center justify-center mb-[5px]"
          v-for="(column, index) in curComponent?.props.columns"
          :key="column.key + new Date().getTime()"
        >
          <a-space>
            <EditOutlined class="cursor-pointer" />
            <a-input size="small" v-model:value="column.title" />
            <a-input
              size="small"
              v-model:value="column.dataIndex"
              @blur="dataIndexChange"
            />
            <DeleteOutlined @click="deleteColumn(index)" class="cursor-pointer" />
            <HolderOutlined class="cursor-grabbing handle" />
          </a-space>
        </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {
  PlusOutlined,
  EditOutlined,
  HolderOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";
import useComponentStore from "@/store/components";
import { storeToRefs } from "pinia";
import { useDraggable } from "vue-draggable-plus";
import { nextTick, ref } from "vue";

const componentStore = useComponentStore();
const { curComponent, curComponentId } = storeToRefs(componentStore);
const { updateComponentProps } = componentStore;

const el = ref()
useDraggable(el, curComponent.value?.props.columns, {
  animation: 50,
  handle: '.handle',
  onEnd: async() => {
    await nextTick()
  }
})

const addColumn = () => {
  const newColumn = {
    title: "newTitle",
    dataIndex: "newTitle",
    key: "newTitle",
  };
  curComponent.value?.props.columns.push(newColumn);
};

const dataIndexChange = (e: any) => {
  const index = curComponent.value?.props.columns.findIndex(
    (item: any) => item.dataIndex === e.target.value
  );
  if (index != -1) {
    curComponent.value!.props.columns[index].key = e.target.value;
  }
};

const deleteColumn = (index: number) => {
    curComponent.value!.props.columns.splice(index, 1)
}
</script>

<style scoped></style>
