import {ComponentConfig} from "@/store/componentConfig.ts";
import ColumnDev from '@/materials/TableColumn/dev.vue'
import ColumnProd from '@/materials/TableColumn/prod.vue'

const TableColumn: ComponentConfig = {
  name: 'TableColumn',
  defaultProps: {},
  desc: '表格列',
  dev: ColumnDev,
  prod: ColumnProd,
  setter: [
    {
      name: 'type',
      label: '类型',
      type: 'select',
      options: [
        {
          label: '文本',
          value: 'text',
        },
        {
          label: '日期',
          value: 'date',
        },
      ],
    },
    {
      name: 'title',
      label: '标题',
      type: 'input',
    },
    {
      name: 'dataIndex',
      label: '字段',
      type: 'input',
    },
  ],
}

export default TableColumn