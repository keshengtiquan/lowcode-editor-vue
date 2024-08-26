<template>
  <template v-for="vnode in renderComponent(components)">
    <component :is="vnode"></component>
  </template>
</template>
<script setup lang="ts">
import useComponentStore, { type Component } from "@/store/components.ts";
import useComponentConfigStore from "@/store/componentConfig.ts";
import { storeToRefs } from "pinia";
import { h, nextTick, ref } from "vue";
import { Button, message } from "ant-design-vue";
import { EnterOutlined } from "@ant-design/icons-vue";

const { components } = storeToRefs(useComponentStore());
const { componentConfig } = storeToRefs(useComponentConfigStore());
const componentRefs = ref<Record<string, any>>({});

function renderComponent(components: Component[]): any {
  return components.map((component) => {
    const config = componentConfig.value[component.name];

    if (!config?.prod) {
      return null;
    }
    console.log({
      ...handleSlot(component),
    });

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
            componentRefs.value[component.id] = ref;
          });
        },
      },
      {
        default: renderComponent(component.children || []),
        ...handleSlot(component),
      }
    );
  });
}

function handelEvent(component: Component) {
  const props: Record<string, any> = {};
  componentConfig.value[component.name].events?.forEach((event) => {
    const eventConfig = component.props[event.name];
    if (eventConfig) {
      props[event.name] = (...args: any[]) => {
        eventConfig.actions.forEach((action: any) => {
          if (action.actionType === "goToLink" && action.url) {
            window.open(action.url, action.target || "_blank");
          }
          if (action.actionType === "message" && action.content) {
            const messageTypeMapping: any = {
              info: message.info,
              warning: message.warning,
              success: message.success,
              error: message.error,
            };
            const showMessage = messageTypeMapping[action.type];
            if (showMessage) {
              showMessage(action.content, action.duration);
            }
          }
          if (action.actionType === "customJS") {
            const func = new Function("context", "args", action.code);
            func(
              {
                name: component.name,
                props: component.props,
                showMessage(content: string) {
                  message.success(content);
                },
              },
              args
            );
          }
          if (action.actionType === "openModal") {
            const component = componentRefs.value[action.config.componentId];
            if (component) {
              component[action.config.method]?.(...args);
            }
          }
        });
      };
    }
  });
  return props;
}

function handleSlot(component: Component) {
  console.log(component.name);
  
  if(component.name === 'Button'){
    return {icon: () => h(EnterOutlined)}
  }
  return {}
}
</script>

<style scoped></style>
