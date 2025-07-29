"use client"
import { ProCard } from "@ant-design/pro-components"
import { Avatar, Card, Row } from "antd"
import Paragraph from "antd/es/typography/Paragraph"
import { useRef, useState } from "react"

export default ({ categoryInfoParams }: { categoryInfoParams: ResData }) => {
console.log('categoryInfoParams')
 const [categoryInfo] = useState<ResData>(categoryInfoParams)

 const cursorMove = useRef<HTMLDivElement>(null)
 return (
  <>
   <Row
    style={{ position: "relative" }}
    gutter={[16, 16]}
   >
    <div ref={cursorMove} className="cursor-move"></div>
    <ProCard
     onMouseLeave={(e) => {
      const mDom = e.currentTarget
      const moveDom = cursorMove.current
      if (mDom && moveDom) {
       moveDom.style.display = "none"
      }
     }}
     ghost wrap gutter={[20, 20]} style={{ marginBlockStart: 8 }}>
     {
      categoryInfo?.results?.map((info, infoIndex) => {
       return (
        <ProCard
         key={info.objectId}
         onMouseMove={(e) => {
          const mDom = e.currentTarget
          const moveDom = cursorMove.current

          if (mDom && moveDom) {
           moveDom.style.display = "block"
           // console.log('mDom',mDom.offsetLeft, mDom.offsetTop)
           moveDom.style.setProperty('--w', mDom.offsetWidth + "px")
           moveDom.style.setProperty('--h', mDom.offsetHeight + "px")
           moveDom.style.setProperty('--x', mDom.offsetLeft + "px")
           moveDom.style.setProperty('--y', mDom.offsetTop + 8 + "px")
          }
         }}
         onCollapse={() => {

         }}
         colSpan={6}
         // collapsible
         hoverable
         bodyStyle={{ padding: 0 }}
         onClick={() => {
          console.log('info', info)

         }} style={{ cursor: "pointer" }}>
         <Card>
          <Card.Meta
           avatar={<Avatar src={info.icon} />}
           title={info.name}
           description={
            <Paragraph ellipsis={{
             rows: 1,
             tooltip: {
              title: info.name,
              overlay: <>{info.desc}</>
             }
            }}>
             {info.desc}
            </Paragraph>
           }
          />
         </Card>
        </ProCard>

        // </Col>
       )
      })

     }
    </ProCard>

   </Row>
  </>
 )
}