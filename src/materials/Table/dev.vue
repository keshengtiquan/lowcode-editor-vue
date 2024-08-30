<template>
  <div :data-component-id="id" :style="styles" class="w-full border-[1px] border-[#000]">
    <a-table :columns="columns">
      <slot></slot>
      <template v-for="(_item, key, index) in $slots" :key="index" v-slot:[key]="_item">
        <slot :name="key" v-bind="_item"></slot>
      </template>
<!--      <template v-slot:bodyCell="{ column, record }">-->
<!--        <slot name="bodyCell" :column="column" :record="record"></slot>-->
<!--      </template>-->
    </a-table>
  </div>
</template>
<script setup lang="ts">
import {CSSProperties} from "vue";

defineProps<{
  id: number;
  styles: CSSProperties;
  columns: any[];
}>();

</script>

<style scoped></style>
