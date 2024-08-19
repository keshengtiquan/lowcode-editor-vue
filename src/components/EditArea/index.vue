<template>
  <div
    class="h-[100%] edit-area"
    @mouseover="handleMouseOver"
    @click="handleClick"
    @mouseleave="
      () => {
        hoverComponentId = undefined;
      }
    "
  >
    <template v-for="vnode in renderComponent(components)">
      <component :is="vnode"></component>
    </template>
    <HoverMask
      v-if="hoverComponentId && hoverComponentId !== curComponentId"
      :component-id="hoverComponentId"
      container-class-name="edit-area"
      portal-wrapper-class-name="portal-wrapper"
    />
    <SelectedMask
      v-if="curComponentId"
      portalWrapperClassName="portal-wrapper"
      containerClassName="edit-area"
      :componentId="curComponentId"
    />
    <div class="portal-wrapper"></div>
  </div>
</template>

<script setup lang="ts">
import useComponentConfigStore from "@/store/componentConfig";
import useComponentStore, { type Component } from "@/store/components";
import { storeToRefs } from "pinia";
import { h, ref } from "vue";
import HoverMask from "../HoverMask/index.vue";
import SelectedMask from "../SelectedMask/index.vue";

const componentStore = useComponentStore();
const componentConfigStore = useComponentConfigStore();
const { components, curComponentId } = storeToRefs(componentStore);
const { componentConfig } = storeToRefs(componentConfigStore);
const { setCurComponentId } = componentStore;

const hoverComponentId = ref<number>();

function renderComponent(components: Component[]): any {
  return components.map((component) => {
    const config = componentConfig.value[component.name];

    if (!config?.dev) {
      return null;
    }

    return h(
      config.dev,
      {
        key: +component.id,
        id: +component.id,
        name: component.name,
        drop: true,
        styles: component.styles,
        ...config.defaultProps,
        ...component.props,
      },
      renderComponent(component.children || [])
    );
  });
}

function handleMouseOver(e: MouseEvent) {
  const path = e.composedPath();
  for (let i = 0; i < path.length; i++) {
    const ele = path[i] as HTMLElement;
    const componentId = ele?.dataset?.componentId;
    if (componentId) {
      hoverComponentId.value = +componentId;
      return;
    }
  }
}

function handleClick(e: any) {
  const path = e.composedPath();
  for (let i = 0; i < path.length; i++) {
    const ele = path[i] as HTMLElement;
    const componentId = ele.dataset.componentId;
    if (componentId) {
      setCurComponentId(+componentId);
      return;
    }
  }
}
</script>

<style scoped></style>
