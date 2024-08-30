import dev from '@/materials/Row/dev.vue'
import prod from '@/materials/Row/prod.vue'
import {ComponentConfig} from "@/store/componentConfig";

const row: ComponentConfig = {
  name: "Row",
  defaultProps: {},
  dev: dev,
  prod: prod,
  desc: "行",
  attrSetter: [
    {
      group: "base",
      title: "基本",
      setter: [
        {
          name: "align",
          label: "对齐",
          type: "select",
          options: [
            {label: "top", value: "top"},
            {label: "middle", value: "middle"},
            {label: "bottom", value: "bottom"},
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
  eventSetter: [],
  events: [],
  slots: [],
};

export default row;
