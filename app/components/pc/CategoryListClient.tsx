"use client"
import { ProCard } from "@ant-design/pro-components"
import Network from "@/network"
import { Avatar, Button, Card, Row } from "antd"
import Paragraph from "antd/es/typography/Paragraph"
import { useEffect, useRef, useState } from "react"
// import { useRouter } from "next/navigation"
import { useRouter } from "@bprogress/next"

export default () => {
 const [categoryInfo, setCategoryInfo] = useState<ResData>({
  results: [{},{},{},{},{},{},{},{}]
 })

 const getIndexData = async () => {
  const res = await Network.get("",{
   params: {
    tableName:"codeList"
   }
  })
  
  const res1: {results: []} = res.data
  
  setCategoryInfo(res1)
 }
  useEffect(() => {
   getIndexData()
  }, [])
  const router = useRouter()
  const cursorMove = useRef<HTMLDivElement>(null)
  return (
   <>
    {/* <Button onClick={
     () => {
      router.push("/pc/aaa")
     }
    }>到aaa页面</Button> */}
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
          key={(info.objectId||"")+Math.random()}
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
           router.push(`/blog/detail/${info.code}`)

          }} style={{ cursor: "pointer" }}>
          <Card
          loading={!info.objectId}
          >
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