type LinksType = {
  self: string
  versions?: string
  stats?: string
  entrypoints?: string
}

type PrevType = {
  bandwidth: number
  hits: number
}

export default interface IPackage {
  bandwidth?: number
  hits?: number
  links: LinksType
  name: string
  prev?: PrevType
  type: 'npm' | 'gh'
  tags?: {
    alpha?: string
    beta?: string
    latest?: string
    lts?: string
    next?: string
  }
  versions?: {
    version: string
    links: LinksType
  }[]
}
