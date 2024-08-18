<template>
  <div class="flex flex-col h-full">
    <div>
      <Header class="h-[60px]"/>
    </div>
    <div v-if="mode === 'edit'" class="flex h-full" @drop="onDrop" @dragstart="onDragStart" @dragenter="onDragEnter"
         @dragover="onDragOver">
      <Material class="w-[300px] border-r-[1px] border-[#e8e9eb]" />
      <EditArea class="flex-1 p-[15px] bg-[#edeff3] relative border-r-[1px] border-[#e8e9eb]"/>
      <Setting class="w-[300px]"/>
    </div>
    <div v-if="mode === 'preview'" class="flex h-full">
      <Preview />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header/index.vue'
import Material from '@/components/Material/index.vue'
import EditArea from '@/components/EditArea/index.vue'
import Setting from '@/components/Setting/index.vue'
import Preview from '@/components/Prview/index.vue'
import useComponentStore from '@/store/components'
import useComponentConfigStore from '@/store/componentConfig'
import {storeToRefs} from 'pinia'
import {ref} from 'vue'

const componentStore = useComponentStore()
const componentConfigStore = useComponentConfigStore()
const {addComponent} = componentStore
const {componentConfig} = storeToRefs(componentConfigStore)
const {mode} = storeToRefs(componentStore)
const dragElementName = ref('')

const onDrop = (e: DragEvent) => {

  const targetElement = e.target as HTMLElement;

  if (!dragElementName.value) return
  if (!targetElement.getAttribute('name')) return

  const config = componentConfig.value[dragElementName.value]
  const componentId = targetElement.dataset.componentId!
  addComponent({
    id: new Date().getTime(),
    name: dragElementName.value,
    desc: config.desc,
    props: config.defaultProps,
    styles: {}
  }, +componentId)
  // clearDrapStyle()
}
const onDragOver = (e: DragEvent) => {
  e.preventDefault()
  // console.log(e.target);

}
const onDragStart = (e: DragEvent) => {
  const targetElement = e.target as HTMLElement;

  const type = targetElement.getAttribute('name')!
  if (type === 'Page') {
    dragElementName.value = ''
  } else {
    dragElementName.value = type
  }
}

const onDragEnter = () => {
  // const targetElement = e.target as HTMLElement;
  // const isDrop = targetElement.getAttribute('drop')!
  // if (isDrop) {
  //   console.log(e.target);
  //   // targetElement.classList.remove('bg-gray-100')
  //   targetElement.classList.add('border-[#006eca]')
  // }
}

</script>

<style scoped>
.dorp-over {
  background-color: blue;
}
</style>