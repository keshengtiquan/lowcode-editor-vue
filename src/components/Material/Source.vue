<template>
  <div class="w-full">
    <Codemirror
        v-model="code"
        :tab-size="2"
        style="height: calc(100vh - 60px); width: calc(300px - 40px);"
        :extensions="extensions"
    />
  </div>
</template>
<script setup lang="ts">
import {Codemirror} from "vue-codemirror";
import {json} from "@codemirror/lang-json";
import useComponentStore from "@/store/components.ts";
import {storeToRefs} from "pinia";

const {components} = storeToRefs(useComponentStore())

const extensions = [json()];

const code = JSON.stringify(components.value, null, 2)
</script>

<style scoped>

</style>