<template>
  <template v-for="vnode in renderComponent(components)">
    <component :is="vnode"></component>
  </template>
</template>
<script setup lang="ts">
import useComponentStore, { type Component } from "@/store/components.ts";
import useComponentConfigStore from "@/store/componentConfig.ts";
import { storeToRefs } from "pinia";
import { h } from "vue";

const { components } = storeToRefs(useComponentStore());
const { componentConfig } = storeToRefs(useComponentConfigStore());

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
        ...handelEvent(component),
      },
      renderComponent(component.children || [])
    );
  });
}

function handelEvent(component: Component) {
  const props: Record<string, any> = {};
  componentConfig.value[component.name].events?.forEach((event) => {
    const eventConfig = component.props[event.name];
    if (eventConfig) {
      props[event.name] = () => {
        eventConfig.actions.forEach((action: any) => {
          if (action.type === "goToLink" && action.url) {
            window.open(action.url, action.target || '_blank');
          }
        });
      };
    }
  });
  return props;
}
</script>

<style scoped></style>
