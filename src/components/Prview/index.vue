<template>
  <template v-for="vnode in renderComponent(components)">
    <component :is="vnode"></component>
  </template>
</template>
<script setup lang="ts">
import useComponentStore, {type Component} from "@/store/components.ts";
import useComponentConfigStore from "@/store/componentConfig.ts";
import {storeToRefs} from "pinia";
import {h} from "vue";

const {components} = storeToRefs(useComponentStore())
const {componentConfig} = storeToRefs(useComponentConfigStore())

function renderComponent(components: Component[]): any {
  return components.map((component) => {
    const config = componentConfig.value[component.name];

    if (!config?.prod) {
      return null;
    }

    return h(
        config.prod,
        {
          key: +component.id,
          id: +component.id,
          name: component.name,
          styles: component.styles,
          ...config.defaultProps,
          ...component.props,
        },
        renderComponent(component.children || [])
    );
  });
}

</script>

<style scoped>

</style>