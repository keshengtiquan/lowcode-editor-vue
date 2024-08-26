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
        <a-space :size="2">
          <EditOutlined
            @click="
              () => {
                showColumnSetting = true;
                editColumn = index;
              }
            "
            class="cursor-pointer hover:bg-[#e8e9ef] hover:text-blue-500 p-[4px] rounded"
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
          <DeleteOutlined
            @click="deleteColumn(index)"
            class="cursor-pointer hover:bg-[#e8e9ef] hover:text-blue-500 p-[4px] rounded"
          />
          <HolderOutlined
            class="cursor-grabbing handle hover:bg-[#e8e9ef] hover:text-blue-500 p-[4px] rounded"
          />
        </a-space>
      </li>
    </ul>
    <div
      v-if="showColumnSetting"
      class="absolute top-2 left-[-300px] origin-center rounded-lg z-50 w-[300px] h-[98%] bg-[#fff] shadow-xl"
    >
      <div class="mx-[15px] mt-[10px] flex justify-between">
        <span>{{ editColumn }}-{{ localColumns[editColumn].title }}</span>
        <div
          class="cursor-pointer flex rounded justify-center items-center w-[18px] h-[18px] hover:bg-[#e8e9ef] transition-all"
        >
          <CloseOutlined
            @click="() => (showColumnSetting = !showColumnSetting)"
          />
        </div>
      </div>
      <div class="px-4 mt-2">
        <a-form :wrapper-col="{ span: 17 }">
          <a-form-item label="列名">
            <a-input
              @change="titleChange"
              size="small"
              v-model:value="localColumns[editColumn].title"
            />
          </a-form-item>
          <a-form-item label="dataIndex">
            <a-input
              size="small"
              @change="(e:any) => dataIndexChange(editColumn, e)"
              v-model:value="localColumns[editColumn].dataIndex"
            />
          </a-form-item>
          <a-form-item label="key">
            <a-input
              disabled
              size="small"
              v-model:value="localColumns[editColumn].key"
            />
          </a-form-item>
          <a-form-item label="对齐方式">
            <a-radio-group size="small"  @change="update" v-model:value="localColumns[editColumn].align" button-style="solid">
              <a-radio-button value="left">左对齐</a-radio-button>
              <a-radio-button value="center">居中</a-radio-button>
              <a-radio-button value="right">右对齐</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="宽度">
            <a-input-number size="small" @change="update"  :min="10" style="width: 100%;" v-model:value="localColumns[editColumn].width"/>
          </a-form-item>
          <a-form-item label="固定">
            <a-radio-group size="small"  @change="update" v-model:value="localColumns[editColumn].fixed" button-style="solid">
              <a-radio-button value="left">固定左</a-radio-button>
              <a-radio-button value="right">固定右</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="拖拽列宽">
            <a-radio-group size="small"  @change="update" v-model:value="localColumns[editColumn].resizable" button-style="solid">
              <a-radio-button :value="true">是</a-radio-button>
              <a-radio-button :value="false">否</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item v-if="localColumns[editColumn].resizable" label="拖拽范围">
            <a-input-number size="small" @change="update"  :min="50"  v-model:value="localColumns[editColumn].minWidth"/>-
            <a-input-number size="small" @change="update"   v-model:value="localColumns[editColumn].maxWidth"/>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  PlusOutlined,
  EditOutlined,
  HolderOutlined,
  DeleteOutlined,
  CloseOutlined,
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

const update = () => {
  updateComponentProps(curComponentId.value!, { columns: localColumns.value });
};
</script>

<style scoped>
.ant-form-item {
  margin-bottom: 5px;
}
</style>
