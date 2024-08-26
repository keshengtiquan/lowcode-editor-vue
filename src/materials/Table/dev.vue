<template>
  <div :data-component-id="id" :style="styles" class="w-full border-[1px] border-[#000]">
    <a-table @resizeColumn="aa" :columns="columns">
      <template v-for="(_item, key, index) in $slots" :key="index" v-slot:[key]="_item">
        <slot :name="key" v-bind="_item"></slot>
      </template>
    </a-table>
  </div>
</template>
<script setup lang="ts">
import { message } from "ant-design-vue";
import { CSSProperties } from "vue";

defineProps<{
  id: number;
  styles: CSSProperties;
  columns: any[];
}>();

const aa = () => {
  message.success(1111);
};
</script>

<style scoped></style>
