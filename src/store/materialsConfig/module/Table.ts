import {ComponentConfig} from "@/store/componentConfig.ts";
import TableDev from '@/materials/Table/dev.vue'
import TableProd from '@/materials/Table/prod.vue'

const Table: ComponentConfig = {
  name: 'Table',
  desc: '表格',
  defaultProps: {
    columns: [
      {
        title: '表格列',
        dataIndex: 'tableItem',
        key: 'tableItem'
      }
    ]
  },
  attrSetter: [
    {
      group: 'base',
      title: '基础',
      setter: [
        {
          name: 'request',
          label: '请求地址',
          type: 'input'
        }
      ]
    },
    {
      group: 'tableColumn',
      title: '列设置',
      setter: [
        {
          name: 'columns',
          label: '列设置',
          type: 'columns'
        }
      ]
    }
  ],
  dev: TableDev,
  prod: TableProd,
  eventSetter: [
    {
      name: 'onResizeColumn',
      label: '拖动列事件'
    },
  ],
  slots: [
    {
      name: 'headerCell',
      label: '表头',
      params: ['column', 'record']
    },
    {
      name: "bodyCell",
      label: "单元格",
      params: ['column', 'record']
    },
  ],
}

export default Table