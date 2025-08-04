
type ResInfo = {
 objectId?: string, content?: string, [T: string]: any
}

type ResData = {
  count?: number,
  results?: ResInfo[]
}

declare namespace CustomGlobalType {
 type GlobalLoading = {
  show: boolean
 }
}
declare module "*.less";