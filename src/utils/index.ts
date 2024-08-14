import { Component } from "@/store/components";

export function getComponentById(
    id: number | null,
    components: Component[]
  ): Component | null {
    if (!id) return null;
  console.log(components)
    for (const component of components) {
      if (component.id == id) return component;
      if (component.children && component.children.length > 0) {
        const result = getComponentById(id, component.children);
        if (result !== null) return result;
      }
    }
    return null;
}