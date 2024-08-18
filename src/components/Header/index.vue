<template>
  <div class="px-5 flex justify-between items-center border-b-[1px] border-[#e8e9eb]">
    <div>低代码编辑器</div>
    <div>
      <a-space>
        <a-button v-if="mode === 'edit'" type="primary" @click="() => {
          setMode('preview')
          setCurComponentId(null)
        }">预览
        </a-button>
        <a-button v-if="mode === 'preview'" type="primary" @click="() => {
          setMode('edit')
        }">退出
        </a-button>
      </a-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import useComponentStore from "@/store/components.ts";
import {storeToRefs} from "pinia";

const componentStore = useComponentStore()

const {mode} = storeToRefs(componentStore)
const {setMode, setCurComponentId} = componentStore
</script>

<style scoped>

</style>