import { defineStore } from "pinia";
import { shallowRef } from "vue";
import Container from "@/materials/Container/index.vue";
import Button from "@/materials/Button/index.vue";
import Page from "@/materials/Page/index.vue";

export interface ComponentConfig {
  name: string;
  defaultProps: Record<string, any>;
  component: any;
  desc: string;
}

const useComponentConfigStore = defineStore("componentConfig", () => {
  const componentConfig = shallowRef<Record<string, ComponentConfig>>({
    Container: {
      name: "Container",
      defaultProps: {},
      component: Container,
      desc: '容器',
    },
    Button: {
      name: "Button",
      defaultProps: {
        type: "primary",
        text: "按钮",
      },
      component: Button,
      desc: '按钮'
    },
    Page: {
      name: "Page",
      defaultProps: {},
      component: Page,
      desc: '页面'
    },
  });

  function registerComponent(name: string, config: ComponentConfig) {
    componentConfig.value[name] = config;
  }

  return {
    componentConfig,
    registerComponent,
  };
});

export default useComponentConfigStore;
