import dev from "@/materials/Button/dev.vue";
import prod from "@/materials/Button/prod.vue";
import { ComponentConfig } from "@/store/componentConfig";

const button: ComponentConfig = {
  name: "Button",
  defaultProps: {
    type: "primary",
    text: "按钮",
  },
  dev: dev,
  prod: prod,
  desc: "按钮",
  attrSetter: [
    {
      group: "base",
      title: "基本",
      setter: [
        {
          name: "type",
          label: "按钮类型",
          type: "select",
          options: [
            { label: "主按钮", value: "primary" },
            { label: "默认", value: "default" },
            { label: "无边框", value: "ghost" },
            { label: "线框", value: "dashed" },
            { label: "链接", value: "link" },
            { label: "文本", value: "text" },
          ],
          group: "基本",
        },
        {
          name: "text",
          label: "文本",
          type: "input",
          group: "基本",
        },
        {
          name: "size",
          label: "尺寸",
          type: "input",
          group: "基本",
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
    {
      name: "icon",
      label: "图标",
    },
  ],
};

export default button;
