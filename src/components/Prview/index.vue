<template>
  <template v-for="vnode in renderComponent(components)">
    <component :is="vnode"></component>
  </template>
</template>
<script setup lang="ts">
import useComponentStore, {type Component} from "@/store/components.ts";
import useComponentConfigStore from "@/store/componentConfig.ts";
import {storeToRefs} from "pinia";
import {h, nextTick, ref} from "vue";
import {message} from "ant-design-vue";

const {components} = storeToRefs(useComponentStore());
const {componentConfig} = storeToRefs(useComponentConfigStore());
const componentRefs = ref<Record<string, any>>({})

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
          ref: (ref: Record<string, any>) => {
            nextTick(() => {
              componentRefs.value[component.id] = ref
            })
          }
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
          console.log(action)
          if (action.actionType === "goToLink" && action.url) {
            window.open(action.url, action.target || '_blank');
          }
          if (action.actionType === 'message' && action.content) {
            const messageTypeMapping: any = {
              info: message.info,
              warning: message.warning,
              success: message.success,
              error: message.error
            };
            const showMessage = messageTypeMapping[action.type];
            if (showMessage) {
              showMessage(action.content, action.duration);
            }
          }
          if (action.actionType === 'customJS') {
            const func = new Function('context', action.code)
            func({
              name: component.name,
              props: component.props,
              showMessage(content: string) {
                message.success(content)
              }
            })
          }
          if (action.actionType === 'openModal') {
            const component = componentRefs.value[action.config.componentId]
            console.log(component[action.config.method])
            component[action.config.method]?.()
          }
        });
      };
    }
  });
  return props;
}
</script>

<style scoped></style>
