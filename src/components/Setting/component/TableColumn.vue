<template>
  <div>
    <a-button @click="addColumn" type="link" size="small"
      ><PlusOutlined />添加列</a-button
    >
    <ul ref="el">
      <li
        v-for="(column, index) in localColumns"
        class="flex items-center justify-center mb-[5px]"
      >
        <a-space>
          <EditOutlined
            @click="
              () => {
                if (editColumn == index) {
                  showColumnSetting = !showColumnSetting;
                } else {
                  editColumn = index;
                }
              }
            "
            class="cursor-pointer"
          />
          <a-input
            size="small"
            v-model:value="column.title"
            @change="titleChange"
          />
          <a-input
            size="small"
            v-model:value="column.dataIndex"
            @change="(e: any) => dataIndexChange(index, e)"
          />
          <DeleteOutlined @click="deleteColumn(index)" class="cursor-pointer" />
          <HolderOutlined class="cursor-grabbing handle" />
        </a-space>
      </li>
    </ul>
    <div
      v-if="showColumnSetting"
      class=" absolute top-0 left-[-300px] z-50 w-[300px] h-full bg-blue-500"
    >
      {{ localColumns[editColumn] }}
    </div>
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
import { ref, watch } from "vue";

const componentStore = useComponentStore();
const { curComponentId } = storeToRefs(componentStore);
const { updateComponentProps } = componentStore;
const showColumnSetting = ref<boolean>(false);
const emit = defineEmits(["update:columns"]);
const editColumn = ref<number>(0);

const props = defineProps<{
  columns: any[];
}>();
const localColumns = ref([...props.columns]);
const el = ref();
const onDragEnd = () => {
  updateComponentProps(curComponentId.value!, { columns: localColumns.value });
};
useDraggable(el, localColumns, {
  animation: 150,
  handle: ".handle",
  onEnd: onDragEnd,
});

watch(
  () => props.columns,
  (newColumns) => {
    localColumns.value = [...newColumns];
  },
  { deep: true }
);

const addColumn = () => {
  localColumns.value.push({
    title: "新增列",
    dataIndex: "newColumn",
    key: "newColumn",
  });
  updateComponentProps(curComponentId.value!, { columns: localColumns.value });
};

const titleChange = () => {
  updateComponentProps(curComponentId.value!, { columns: localColumns.value });
};

const dataIndexChange = (index: number, e: any) => {
  localColumns.value[index].key = e.target.value;
  updateComponentProps(curComponentId.value!, { columns: localColumns.value });
};

const deleteColumn = (index: number) => {
  localColumns.value.splice(index, 1);
  updateComponentProps(curComponentId.value!, { columns: localColumns.value });
};
</script>

<style scoped></style>
