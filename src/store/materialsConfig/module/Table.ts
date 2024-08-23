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
  prod: TableProd
}

export default Table