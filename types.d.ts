
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
// 方案一：声明所有 .scss 模块为任意类型（适合副作用导入，如 import './index.scss'）
declare module '*.scss';
declare module "*.less";
declare module '*.svg' {
  import React = require('react')
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
    title?: string;
  }>

}
declare module "three/examples/jsm/controls/OrbitControls"