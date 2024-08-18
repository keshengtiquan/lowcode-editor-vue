import devPage from "@/materials/Page/dev.vue";
import prodPage from "@/materials/Page/prod.vue";

export default {
  name: "Page",
  defaultProps: {},
  dev: devPage,
  prod: prodPage,
  desc: "页面",
};
