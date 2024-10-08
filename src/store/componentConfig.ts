import {defineStore} from "pinia";
import {ref} from "vue";
import getMaterialsConfig from './materialsConfig/index'

export interface ComponentSetter {
  name: string;
  label: string;
  type: string;
  [key: string]: any
}

export interface ComponentMethod {
  name: string
  label: string
}

export interface ComponentEvent {
  name: string,
  label: string
}

export interface ComponentSlot {
  name: string,
  label: string,
  params?: string[]
}

export interface ComponentConfig {
  name: string;
  defaultProps: Record<string, any>;
  desc: string;
  attrSetter?: {group: string, title: string, setter: ComponentSetter[]}[],
  setter?: ComponentSetter[],
  stylesSetter?: { group: string, title: string, setter: ComponentSetter[] }[],
  eventSetter?: ComponentEvent[],
  events?: ComponentEvent[],
  methods?: ComponentMethod[]
  dev: any,
  prod: any,
  slots?: ComponentSlot[]
}

const useComponentConfigStore = defineStore("componentConfig", () => {
  const componentConfig = ref<Record<string, ComponentConfig>>(getMaterialsConfig());
  
  function registerComponent(name: string, config: ComponentConfig) {
    componentConfig.value[name] = config;
  }
  
  function addEvent(name: string, event: ComponentEvent) {
    const old = componentConfig.value[name].events || []
    const index = old.findIndex(item => item.name === event.name)
    if (index === -1) {
      componentConfig.value[name].events = [...old, event]
    }
  }
  
  return {
    componentConfig,
    registerComponent,
    addEvent
  };
});

export default useComponentConfigStore;
