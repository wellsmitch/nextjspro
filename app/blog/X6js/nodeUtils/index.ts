"use client"
import { Node } from "@antv/x6"

export const createNode = (nodeOptions: Node.Metadata) => {
 const node = new Node({
  // id 是节点/边的唯一标识，推荐使用具备业务意义的 ID，默认使用自动生成的 UUID。
  id: `nodeId-${Math.random()}`,
  // markup 指定了渲染节点/边时使用的 SVG/HTML 片段，使用 JSON 格式描述。例如内置节点 Shape.Rect 的 markup 定义如下：
  markup: [
   {
    // SVG/HTML 元素标签名。
    tagName: 'rect',
    // 选择器 和 attrs 属性的 key 值做对应
    // 该元素的群组选择器，可以同时为该群组对应的多个元素指定样式。
    selector: 'body1',
    // Attr.SimpleAttrs	该元素的默认属性键值对。
    groupSelector: "",
    attrs: {
     fill: '#f00',
     stroke: "#f0f",
     textAnchor: 'top',
     textVerticalAnchor: 'middle',
   },
   style: {},
   // 该元素的 CSS 样式名。
   className:"",
   // 该元素的文本内容。
   textContent:"",
   // 嵌套的子元素。 Markup[]	
   children: []

   },
   {
    tagName: 'text',
    selector: 'label',
   },
  ],
  /**
   * 属性选项 attrs 是一个复杂对象，该对象的 Key 是节点 Markup 定义中元素的选择器(selector)，对应的值是应用到该 SVG 元素的 SVG 属性值(如 fill 和 stroke)，
      创建节点/边后，我们可以调用实例上的 attr() 方法来修改节点属性样式。看下面代码，通过 / 分割的路径修改样式，label 选择器对应到 <text> 元素，text 则是该元素的属性名，hello 是新的属性值。

      rect.attr('label/text', 'hello')

      // 等同于
      rect.attr('label', {
        text: 'hello',
      })

      // 等同于
      rect.attr({
        label: {
          text: 'hello',
        },
      })
      当传入的属性值为 null 时可以移除该属性。
      rect.attr('label/text', null)
   * 
   *  */   
  attrs: {
   // 指定 rect 元素的样式
   body1: {
    stroke: '#0f0', // 边框颜色
    fill: '#0ff',   // 填充颜色
    width: 100,
    height: 50,
    // refWidth: 100,
    refHeight: 80,
   },
   // 指定 text 元素的样式
   label: {
    text: 'rectcccccccccc', // 文字
    fill: '#f00', // 文字颜色
   },
  },
 // "rect" | "circle" | "ellipse" | "polygon" | "polyline" | "path" | "image" | "html"
  shape: nodeOptions.shape,
  size: {
   width: 100,
   height: 60,
  },

  x: 100,
  y: 40,
  // 节点的宽度 并不是 内部的 rect 的宽度
  width: 100,
  // height: 160,
 })
 const node1 = new Node(nodeOptions)
 return node1
}