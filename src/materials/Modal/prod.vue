<template>
  <a-modal v-model:open="open" :style="styles" destroyOnClose @ok="() => {onOk && onOk()}"
           @cancel="() => {onCancel && onCancel()}">
    <slot></slot>
  </a-modal>
</template>
<script setup lang="ts">
import {CSSProperties, ref} from 'vue';

defineProps<{
  styles: CSSProperties
  onOk: Function
  onCancel: Function
}>()

const open = ref<boolean>(false);

const openModal = () => {
  open.value = true;
};

const closeModal = () => {
  open.value = false;
};

defineExpose({openModal, closeModal})
</script>

<style scoped>

</style>