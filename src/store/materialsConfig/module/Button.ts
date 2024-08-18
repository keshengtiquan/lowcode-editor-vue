import dev from "@/materials/Button/dev.vue";
import prod from "@/materials/Button/prod.vue"
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
    },
    {
      name: "text",
      label: "文本",
      type: "input",
    },
  ],
  stylesSetter: [
    {
      name: "width",
      label: "宽度",
      type: "input",
    },
    {
      name: "height",
      label: "高度",
      type: "input",
    },
  ],
};

export default button;
