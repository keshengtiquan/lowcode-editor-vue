import {Component} from "@/store/components";
import {kebabCase} from 'lodash-es'
export function getComponentById(
  id: number | null,
  components: Component[]
): Component | null {
  if (!id) return null;
  for (const component of components) {
    if (component.id == id) return component;
    if (component.children && component.children.length > 0) {
      const result = getComponentById(id, component.children);
      if (result !== null) return result;
    }
  }
  return null;
}

export function toCSSStr(css: Record<string, any>) {
  let str = `.comp {\n`;
  for(let key in css) {
      let value = css[key];
      if(!value) {
          continue;
      }
      if(['width', 'height'].includes(key) &&  !value.toString().endsWith('px')) {
          value += 'px';
      }

      str += `\t${kebabCase(key)}: ${value};\n`
  }
  str += `}`;
  return str;
}