import type IPackage from '@/pkg/interfaces/package'

export default (item: IPackage) => {
  if (item?.type === 'gh') {
    return 'github'
  }
  return item?.type
}
