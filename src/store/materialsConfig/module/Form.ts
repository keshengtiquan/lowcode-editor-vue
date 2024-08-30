import dev from '@/materials/Form/dev.vue'
import prod from '@/materials/Form/prod.vue'
import { ComponentConfig } from "@/store/componentConfig";

const form: ComponentConfig = {
  name: "Form",
  defaultProps: {},
  dev: dev,
  prod: prod,
  desc: "表单",
  attrSetter: [
    {
      group: "base",
      title: "基本",
      setter: [
        {
          name: "layout",
          label: "布局",
          type: "select",
          options: [
            { label: "水平", value: "horizontal" },
            { label: "垂直", value: "vertical" },
            { label: "内联", value: "inline" },
          ],
        },
      ],
    },
  ],
  stylesSetter: [
    {
      group: "layout",
      title: "布局",
      setter: [],
    },
    {
      group: "text",
      title: "字体",
      setter: [
        {
          name: "font-size",
          label: "字号",
          type: "inputNumber",
        },
        {
          name: "line-height",
          label: "行高",
          type: "inputNumber",
        },
      ],
    },
  ],
  eventSetter: [
    {
      name: "onclick",
      label: "点击事件",
    },
    {
      name: "ondblclick",
      label: "双击事件",
    },
  ],
  events: [],
  slots: [
  
  ],
};

export default form;
