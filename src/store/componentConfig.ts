import { defineStore } from "pinia";
import { shallowRef } from "vue";
import getMaterialsConfig from './materialsConfig/index'

export interface ComponentSetter {
  name: string;
  label: string;
  type: string;
  [key: string]: any
}

export interface ComponentConfig {
  name: string;
  defaultProps: Record<string, any>;
  desc: string;
  setter?: ComponentSetter[],
  stylesSetter?: {group: string,title: string, setter: ComponentSetter[]}[],
  dev: any,
  prod: any,
}

const useComponentConfigStore = defineStore("componentConfig", () => {
  const componentConfig = shallowRef<Record<string, ComponentConfig>>(getMaterialsConfig());

  function registerComponent(name: string, config: ComponentConfig) {
    componentConfig.value[name] = config;
  }

  return {
    componentConfig,
    registerComponent,
  };
});

export default useComponentConfigStore;
