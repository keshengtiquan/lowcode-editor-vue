<template>
  <component
    :is="componentType"
    v-model:value="modelValue"
    v-bind="componentProps"
  />
</template>

<script lang="ts" setup>
import { ComponentSetter } from "@/store/componentConfig";
import { computed } from "vue";
import { Input, InputNumber, Select } from "ant-design-vue";

const props = defineProps<{
  setter: ComponentSetter;
  modelValue: any;
}>();
const emit = defineEmits(["update:modelValue"]);

const modelValue = computed({
    set(value: any){
        emit('update:modelValue', value)
    },
    get(){
        return props.modelValue
    }
})

const componentType = computed(() => {
  switch (props.setter.type) {
    case "input":
      return Input;
    case "select":
      return Select;
    case "inputNumber":
      return InputNumber;
    default:
      return null;
  }
});

const componentProps = computed(() => {
  const commonProps = {
    size: "small",
    // "v-model:value": props.modelValue,
    // "onUpdate:modelValue": (value: any) => emit("update:modelValue", value),
  };
  if (props.setter.type === "select") {
    return {
      ...commonProps,
      options: props.setter.options,
    };
  }
  if (props.setter.type === "inputNumber") {
    return {
      ...commonProps,
      style: { width: "100%" },
    };
  }
  return commonProps;
});
</script>

<style lang="scss" scoped></style>
