import dev from '@/materials/Col/dev.vue'
import prod from '@/materials/Col/prod.vue'
import {ComponentConfig} from "@/store/componentConfig";

const col: ComponentConfig = {
  name: "Col",
  defaultProps: {
    span: 12
  },
  dev: dev,
  prod: prod,
  desc: "列",
  attrSetter: [
    {
      group: "base",
      title: "基本",
      setter: [
        {
          name: "span",
          label: "栅格数",
          type: "inputNumber",
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
  eventSetter: [],
  events: [],
  slots: [],
};

export default col;
