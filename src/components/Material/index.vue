<template>
  <div class="flex">
    <ul class="w-[40px] border-r-[1px] border-[#e8e9eb] mb-0">
      <li class="material-item" :class="[activeKey === 1 ? 'active' : '']" @click="changeTab(1)">
        <AppstoreOutlined/>
      </li>
      <li class="material-item" :class="[activeKey === 2 ? 'active' : '']" @click="changeTab(2)">
        <NodeExpandOutlined/>
      </li>
      <li class="material-item" :class="[activeKey === 3 ? 'active' : '']" @click="changeTab(3)">
        <CodeOutlined/>
      </li>
    </ul>
    <div class="flex-1">
      <Material v-if="activeKey === 1"/>
      <Outline v-if="activeKey === 2"/>
      <Source v-if="activeKey === 3"/>
    </div>

  </div>
</template>

<script setup lang="ts">
import Material from "@/components/Material/Material.vue";
import Outline from './Outline.vue'
import Source from './Source.vue'
import {AppstoreOutlined, NodeExpandOutlined, CodeOutlined} from '@ant-design/icons-vue'
import {ref} from 'vue'

const activeKey = ref(1)

const changeTab = (key: number) => {
  activeKey.value = key
}

</script>

<style scoped>

.active {
  background-color: #EEF3FE;
  color: #2468f2;
  box-sizing: border-box;
  position: relative;
}

.active::after {
  content: '';
  position: absolute;
  width: 3px;
  height: 100%;
  background-color: rgb(36, 104, 242);
  left: 0;
}
</style>
