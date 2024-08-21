import devContainer from "@/materials/Container/dev.vue";
import prodContainer from "@/materials/Container/prod.vue";

export default {
  name: "Container",
  defaultProps: {},
  dev: devContainer,
  prod: prodContainer,
  desc: "容器",
  stylesSetter: [
    {
      group: "layout",
      title: "布局",
      setter: [],
    },
  ],
};
