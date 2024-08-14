import { getComponentById } from "@/utils";
import { defineStore } from "pinia";
import { ref } from "vue";

export interface Component {
    id: number;
    name: string;
    props: any;
    children?: Component[];
    parentId?: number;
    desc?: string;
  }

const useComponentStore = defineStore( 'components',() => {
    const components = ref<Component[]>([{
        id: 1,
        name: 'Page',
        props: {},
        desc: '页面',
        children: []
    }]);

    const curComponentId = ref<number | null>(null)
    const curComponent = ref<Component | null>(null)

    function setCurComponentId(componentId: number){
        curComponentId.value = componentId
        curComponent.value = getComponentById(componentId, components.value)
    }

    function addComponent(component: Component, parentId?: number){
        if(parentId) {
            const parentComponent = getComponentById(parentId, components.value)
            
            if(parentComponent) {
                if (parentComponent.children) {
                    parentComponent.children.push(component);
                  } else {
                    parentComponent.children = [component];
                  }
            }
            component.parentId = parentId;
        }else {
            components.value = [...components.value, component];
        }
    }

    function deleteComponent(componentId: number) {
        if(!componentId) return
        // 查找要删除的组件
        const component  = getComponentById(componentId, components.value)
        if(component && component.parentId) {
            // 查找要删除的父级组件
            const parentComponent = getComponentById(component.parentId, components.value)
            if(parentComponent) {
                parentComponent.children = parentComponent.children?.filter(item => item.id !== componentId)
            }
        } 
    }

    function updateComponent(componentId: number, props: any){
        const component = getComponentById(componentId, components.value)
        if(component) {
            component.props = {...component.props, ...props}
        }
    }
    

    return {
        components,
        curComponent,
        curComponentId,
        addComponent,
        deleteComponent,
        updateComponent,
        setCurComponentId
    }
})

export default useComponentStore;