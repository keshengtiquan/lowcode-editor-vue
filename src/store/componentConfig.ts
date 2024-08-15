import { defineStore } from "pinia";
import { shallowRef } from "vue";
import Container from "@/materials/Container/index.vue";
import Button from "@/materials/Button/index.vue";
import Page from "@/materials/Page/index.vue";

export interface ComponentSetter {
  name: string;
  label: string;
  type: string;
  [key: string]: any
}

export interface ComponentConfig {
  name: string;
  defaultProps: Record<string, any>;
  component: any;
  desc: string;
  setter?: ComponentSetter[],
  stylesSetter?: ComponentSetter[],
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
      desc: '按钮',
      setter: [
        {
          name: 'type',
          label: '按钮类型',
          type: 'select',
          options: [
            {label: '主按钮', value: 'primary'},
            {label: '默认', value: 'default'},
            {label: '无边框', value: 'ghost'},
            {label: '线框', value: 'dashed'},
            {label: '链接', value: 'link'},
            {label: '文本', value: 'text'},
          ]
        },
        {
          name: 'text',
          label: "文本",
          type: 'input'
        }
      ],
      stylesSetter: [
        {
          name: 'width',
          label: '宽度',
          type: 'input'
        },
        {
          name: 'height',
          label: '高度',
          type: 'input'
        },
      ]
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
