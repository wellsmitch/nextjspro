"use client"
import CHeader from "@/app/blog/CustomHeader"
import { useState } from 'react'
import { Flipper, Flipped } from 'react-flip-toolkit'
import { useRouter } from "@bprogress/next"
import { ArrowLeftOutlined } from "@ant-design/icons"
import { Button } from "antd"

function FlipDemo() {
 const nextRouter = useRouter()
 const [list, setList] = useState(new Array(50).fill("").map((f, fIndex) => (fIndex + 1)))

 const shuffle = () => {
  setList([...list.sort(() => Math.random() - 0.5)])
 }

 return (
  <>
   <CHeader
    modelActiveCode="flip"
    renderBack={() => {
     return <div
      onClick={() => {
       console.log('123', 123)
       nextRouter.replace("/blog")
      }}
      style={{ width: 100, textAlign: "right", cursor: "pointer" }}>
      <ArrowLeftOutlined className="header-back-icon" />返回
     </div>
    }}
   />

   <div>
     <Button type="primary" style={{display: "block",margin: "0 auto"}} onClick={shuffle}>打乱</Button>
    <Flipper flipKey={list.join('')}>
     <div style={{ display: 'flex', flexWrap: "wrap", textAlign: "center", lineHeight: "60px" }}>
      {list.map(item => (
       <Flipped key={item} flipId={item}>
        <div
         style={{
          width: 60,
          height: 60,
          backgroundColor: 'skyblue',
          color: 'white',
          fontSize: '30px',
          margin: 10,
         }}
        >
         {item}
        </div>
       </Flipped>
      ))}
     </div>
    </Flipper>

   
   </div>
  </>
 )
}

export default FlipDemo