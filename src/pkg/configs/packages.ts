import type ITableHeader from '@/pkg/interfaces/table-header'

export const PackagesTableHeaders: ITableHeader[] = [
  {
    code: 'type',
    name: 'Type',
    class: 'column_type',
    style: {
      width: '10%'
    }
  },
  {
    code: 'name',
    name: 'Name',
    class: 'column_name',
    style: {
      width: '40%'
    }
  },
  {
    code: 'link',
    name: 'Link',
    class: 'column_link',
    style: {
      width: '50%'
    }
  },
  {
    code: 'hits',
    name: 'Hits',
    class: 'column_hits',
    style: {
      width: '10%'
    }
  }
]
