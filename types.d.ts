
type ResInfo = {
 objectId?: string, content?: string, [T: string]: any
}

type ResData = {
  count?: number,
  results?: ResInfo[]
}

type X6Info = {
 name?: string,
 objectId?: string,
 codeInfo?: string,
}

declare namespace CustomGlobalType {
 type GlobalLoading = {
  show: boolean
 }
}
declare module "*.less";
declare module "three/examples/jsm/controls/OrbitControls"