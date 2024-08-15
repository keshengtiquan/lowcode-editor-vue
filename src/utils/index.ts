import {Component} from "@/store/components";
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

export function formatCss(data: any) {
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      if (key === 'width' || key === 'height') {
        data[key] = data[key] + 'px'
      }
    }
  }
  return data
}