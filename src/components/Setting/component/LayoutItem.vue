<template>
  <a-form ref="formRef" :wrapper-col="{ span: 14 }">
    <a-form-item label="布局模式" name="lauout">
      <a-radio-group size="small" v-model:value="display">
        <a-radio-button value="inline"><FieldNumberOutlined /></a-radio-button>
        <a-radio-button value="flex"><InsertRowAboveOutlined /></a-radio-button>
        <a-radio-button value="block"><OneToOneOutlined /></a-radio-button>
        <a-radio-button value="inline-block"
          ><SplitCellsOutlined
        /></a-radio-button>
        <a-radio-button value="none"><EyeInvisibleOutlined /></a-radio-button>
      </a-radio-group>
    </a-form-item>
    <div class="relative w-full h-[150px]">
      <div class="margin-top-div">
        <span
          class="absolute left-0 right-0 top-[-20px] h-[20px] bg-transparent w-full"
        >
          <input
            v-model="paddingTop"
            class="w-full outline-none text-center leading-[20px] h-[20px] p-0 bg-transparent"
            placeholder="0"
            :maxlength="3"
            autocomplete="off"
          />
        </span>
      </div>
      <div class="margin-right-div">
        <span
          class="absolute top-0 bottom-0 right-[-20px] w-[20px] bg-transparent m-auto"
        >
          <input
            v-model="paddingRight"
            class=" absolute top-0 bottom-0 left-[-20px] w-[60px] h-[20px] m-auto px-[8px] outline-none text-center leading-[20px]  bg-transparent"
            placeholder="0"
            :maxlength="3"
            autocomplete="off"
          />
        </span>
      </div>
    </div>
  </a-form>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  FieldNumberOutlined,
  InsertRowAboveOutlined,
  OneToOneOutlined,
  SplitCellsOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons-vue";

const props = defineProps<{
  display: any;
  paddingTop: string | number;
  paddingRight: string | number;
}>();
const emit = defineEmits(["update:display", "update:paddingTop","update:paddingRight"]);

const display = computed({
  set(value: any) {
    emit("update:display", value);
  },
  get() {
    return props.display;
  },
});
const paddingTop = computed({
  set(value: string | number) {
    emit("update:paddingTop", value);
  },
  get(): string | number {
    return props.paddingTop;
  },
});
const paddingRight = computed({
  set(value: string | number) {
    emit("update:paddingRight", value);
  },
  get(): string | number {
    return props.paddingRight;
  },
});
</script>

<style scoped>
.margin-top-div {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 20px solid #d6e4ff;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.margin-right-div {
    position: absolute;
    top: 5px;
    bottom: 5px;
    right: 0;
    width: 0;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-right: 20px solid #d6e4ff;
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
}
</style>
