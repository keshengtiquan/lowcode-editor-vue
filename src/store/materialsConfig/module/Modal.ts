import ModalDev from '@/materials/Modal/dev.vue'
import ModalProd from '@/materials/Modal/prod.vue'
import {ComponentConfig} from "@/store/componentConfig.ts"

const Modal: ComponentConfig = {
  name: 'Modal',
  defaultProps: {
    title: '弹窗',
  },
  attrSetter: [
    {
      group: 'base',
      title: '基础',
      setter: [
        {
          name: 'title',
          label: '标题',
          type: 'input',
        }
      ]
    }
  ],
  stylesSetter: [],
  eventSetter: [
    {
      name: 'onOk',
      label: '确认事件'
    },
    {
      name: 'onCancel',
      label: '取消事件'
    }
  ],
  desc: '弹窗',
  dev: ModalDev,
  prod: ModalProd,
  methods: [
    {
      name: 'openModal',
      label: '打开弹窗'
    },
    {
      name: 'closeModal',
      label: '关闭弹窗'
    }
  ]
}

export default Modal