<template>
  <template v-if="el">
    <Teleport :to="el">
      <div
          :style="{
          position: 'absolute',
          left: `${position.left}px`,
          top: `${position.top}px`,
          backgroundColor: 'rgba(0, 0, 255, 0.1)',
          border: '1px dashed blue',
          pointerEvents: 'none',
          width: `${position.width}px`,
          height: `${position.height}px`,
          zIndex: 12,
          borderRadius: 4,
          boxSizing: 'border-box',
        }"
      />
      <div
          :style="{
          position: 'absolute',
          left: `${position.labelLeft}px`,
          top: `${position.labelTop}px`,
          fontSize: '14px',
          zIndex: 13,
          display: `${
            !position.width || position.width < 10 ? 'none' : 'inline'
          }`,
          transform: 'translate(-100%, -100%)',
        }"
      >
        <a-space>

          <a-dropdown>
            <div
                :style="{
            padding: '0 8px',
            backgroundColor: 'blue',
            borderRadius: 4,
            color: '#fff',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }"
            >
              {{ curComponent?.desc }}
            </div>
            <template #overlay>
              <a-menu @click="menuClick">
                <a-menu-item v-for="item in parentComponents" :key="item!.id">
                  {{ item!.desc }}
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
          <div v-if="curComponentId !== 1" style="color: #fff; padding: 0 8px; background-color: blue">
            <a-popconfirm
                title="确定删除当前组件?"
                ok-text="是"
                cancel-text="否"
                @confirm="handleDelete"
            >
              <DeleteOutlined/>
            </a-popconfirm>
          </div>
        </a-space>

      </div>
    </Teleport>
  </template>
</template>

<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref, watch} from "vue";
import useComponentStore from "@/store/components.ts";
import {storeToRefs} from "pinia";
import {getComponentById} from "@/utils";
import {DeleteOutlined} from "@ant-design/icons-vue";
import {bus} from "@/utils/eventBus.ts";

const componentStore = useComponentStore();
const {components, curComponentId} = storeToRefs(componentStore);
const {deleteComponent, setCurComponentId} = componentStore;

const el = ref();
const position = ref({
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  labelTop: 0,
  labelLeft: 0,
});
const props = defineProps<{
  componentId: number;
  containerClassName: string;
  portalWrapperClassName: string;
}>();


function updatePosition() {
  if (!props.componentId) return;

  const container = document.querySelector(`.${props.containerClassName}`);
  if (!container) return;

  const node = document.querySelector(
      `[data-component-id='${props.componentId}']`
  );
  if (!node) return;

  const {top, left, width, height} = node.getBoundingClientRect();
  const {top: containerTop, left: containerLeft} =
      container.getBoundingClientRect();

  let labelTop = top - containerTop + container.scrollTop;
  let labelLeft = left - containerLeft + width;

  if (labelTop <= 0) {
    labelTop -= -20;
  }

  position.value = {
    top: top - containerTop + container.scrollTop,
    left: left - containerLeft + container.scrollTop,
    width,
    height,
    labelTop,
    labelLeft,
  };
}

bus.on('updatePosition', (value) => {
  if (value.width && value.width.includes('px') || value.height && value.height.includes('px')) {
    setTimeout(() => {
      updatePosition()
    }, 200)
  }
})

const menuClick = (data: any) => {
  setCurComponentId(data.key)
}

const curComponent = computed(() => {
  return getComponentById(props.componentId, components.value);
});

const parentComponents = computed(() => {
  const parentComponents = []
  let component = curComponent.value

  while (component?.parentId) {
    component = getComponentById(component.parentId, components.value)
    parentComponents.push(component)
  }

  return parentComponents
})

const handleDelete = () => {
  deleteComponent(+curComponentId.value!);
  setCurComponentId(null);
};

watch(
    () => props.componentId,
    () => {
      updatePosition();
    },
    {immediate: true}
);

watch(components.value, () => {
  updatePosition();
})
const resizeHandler = () => {
  updatePosition();
}
onMounted(() => {
  el.value = document.querySelector(`.${props.portalWrapperClassName}`)!;
  window.addEventListener('resize', resizeHandler)
});
onUnmounted(() => {
  window.removeEventListener('resize', resizeHandler)
})
</script>

<style scoped></style>
