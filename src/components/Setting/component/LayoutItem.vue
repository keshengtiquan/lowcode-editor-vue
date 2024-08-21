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
            v-model="marginTop"
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
            v-model="marginRight"
            class="absolute top-0 bottom-0 left-[-20px] w-[60px] h-[20px] m-auto px-[8px] outline-none text-center leading-[20px] bg-transparent"
            placeholder="0"
            :maxlength="3"
            autocomplete="off"
          />
        </span>
      </div>
      <div class="margin-bottom-div">
        <span class="float-left ml-[-10px] scale-75 text-[12px] text-[#666]"
          >MARGIN</span
        >
        <span
          class="absolute left-0 right-0 bottom-[-20px] h-[20px] bg-transparent"
        >
          <input
            v-model="marginBottom"
            class="absolute left-0 right-0 bottom[-20px] bg-transparent outline-none text-center h-[20px] leading-[20px]"
            placeholder="0"
            :maxlength="3"
            autocomplete="off"
          />
        </span>
      </div>
      <div class="margin-left-div">
        <span
          class="absolute top-0 bottom-0 left-[-20px] w-[20px] m-auto bg-transparent"
        >
          <input
            v-model="marginLeft"
            class="absolute top-0 bottom-0 right-[-20px] m-auto w-[60px] px-[8px] bg-transparent outline-none text-center h-[20px] leading-[20px]"
            placeholder="0"
            :maxlength="3"
            autocomplete="off"
          />
        </span>
      </div>
      <div class="padding-top-div">
        <span class="absolute left-0 right-0 top-[-20px] h-[20px] bg-transparent w-full">
          <input
          class="w-full outline-none text-center leading-[20px] h-[20px] p-0 bg-transparent"
            v-model="paddingTop"
            placeholder="0"
            :maxlength="3"
            autocomplete="off"
          />
        </span>
      </div>
      <div class="padding-right-div">
        <span
          class="absolute top-0 bottom-0 right-[-20px] w-[20px] bg-transparent m-auto"
        >
          <input
            v-model="paddingRight"
            class="absolute top-0 bottom-0 left-[-20px] w-[60px] h-[20px] m-auto px-[8px] outline-none text-center leading-[20px] bg-transparent"
            placeholder="0"
            :maxlength="3"
            autocomplete="off"
          />
        </span>
      </div>
      <div class="padding-bottom-div">
        <span class="float-left ml-[-10px] scale-75 text-[12px] text-[#666]"
          >PADDING</span
        >
        <span
          class="absolute left-0 right-0 bottom-[-20px] h-[20px] bg-transparent"
        >
          <input
            v-model="paddingBottom"
            class="absolute left-0 right-0 bottom[-20px] bg-transparent outline-none text-center h-[20px] leading-[20px]"
            placeholder="0"
            :maxlength="3"
            autocomplete="off"
          />
        </span>
      </div>
      <div class="padding-left-div">
        <span
          class="absolute top-0 bottom-0 left-[-20px] w-[20px] m-auto bg-transparent"
        >
          <input
            v-model="paddingLeft"
            class="absolute top-0 bottom-0 right-[-20px] m-auto w-[60px] px-[8px] bg-transparent outline-none text-center h-[20px] leading-[20px]"
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
  marginTop: string | number;
  marginRight: string | number;
  marginBottom: string | number;
  marginLeft: string | number;
  paddingTop: string | number;
  paddingRight: string | number;
  paddingBottom: string | number;
  paddingLeft: string | number;
}>();
const emit = defineEmits([
  "update:display",
  "update:marginTop",
  "update:marginRight",
  "update:marginBottom",
  "update:marginLeft",
  "update:paddingTop",
  "update:paddingRight",
  "update:paddingBottom",
  "update:paddingLeft",
]);

const display = computed({
  set(value: any) {
    emit("update:display", value);
  },
  get() {
    return props.display;
  },
});
const marginTop = computed({
  set(value: string | number) {
    emit("update:marginTop", value);
  },
  get(): string | number {
    return props.marginTop;
  },
});
const marginRight = computed({
  set(value: string | number) {
    emit("update:marginRight", value);
  },
  get(): string | number {
    return props.marginRight;
  },
});
const marginBottom = computed({
  set(value: string | number) {
    emit("update:marginBottom", value);
  },
  get(): string | number {
    return props.marginBottom;
  },
});
const marginLeft = computed({
  set(value: string | number) {
    emit("update:marginLeft", value);
  },
  get(): string | number {
    return props.marginLeft;
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
const paddingBottom = computed({
  set(value: string | number) {
    emit("update:paddingBottom", value);
  },
  get(): string | number {
    return props.paddingBottom;
  },
});
const paddingLeft = computed({
  set(value: string | number) {
    emit("update:paddingLeft", value);
  },
  get(): string | number {
    return props.paddingLeft;
  },
});
</script>

<style scoped>
.ant-form-item {
  margin-bottom: 8px;
}
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
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.margin-bottom-div {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 20px solid #d6e4ff;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.margin-left-div {
  position: absolute;
  top: 5px;
  bottom: 5px;
  left: 0;
  width: 0;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-left: 20px solid #d6e4ff;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.padding-top-div {
  position: absolute;
  top: 25px;
  left: 25px;
  right: 25px;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 20px solid #d6e4ff;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.padding-right-div {
  position: absolute;
  top: 30px;
  bottom: 30px;
  right: 25px;
  width: 0;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-right: 20px solid #d6e4ff;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.padding-bottom-div {
  position: absolute;
  bottom: 25px;
  left: 25px;
  right: 25px;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 20px solid #d6e4ff;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.padding-left-div {
  position: absolute;
  top: 30px;
  bottom: 30px;
  left: 25px;
  width: 0;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-left: 20px solid #d6e4ff;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
</style>
