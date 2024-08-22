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
  setter: [
    {
      name: 'request',
      label: '请求地址',
      type: 'input'
    }
  ],
  dev: TableDev,
  prod: TableProd
}

export default Table