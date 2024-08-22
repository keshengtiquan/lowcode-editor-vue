import { ComponentConfig } from "../componentConfig";

const modules = import.meta.glob("../materialsConfig/module/*.ts", {
  eager: true,
});

interface ConfigType {
  default: ComponentConfig;
}

export default () => {
    const obj:Record<string, ComponentConfig> = {}
  for (const materialConfig of Object.values(modules)) {
    const config = (materialConfig as ConfigType)?.default ?? [];
    obj[config.name] = config
  }

  return obj
};
