"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Tabs, Row, Col, Anchor } from "antd"
import ColumnCpt from "./column"
import Line from "./line"
import Pie from "./pie"
import Bar from "./bar"
import "./index.scss"
import {useRouter} from "@bprogress/next"
import CHeader from "@/app/blog/CustomHeader"
import {ArrowLeftOutlined} from "@ant-design/icons"

const Index = () => {

  const nextRouter = useRouter()
  const [list, setList] = useState([
    {
      key: "bar",
      href: "#bar",
      title: "bar",
      component: <Bar />
    },
    {
      key: "column",
      href: "#column",
      title: "column",
      component: <ColumnCpt />
    },
    {
      key: "line",
      href: "#line",
      title: "line",
      component: <Line />
    },
    {
      key: "pie",
      href: "#pie",
      title: "pie",
      component: <Pie />
    },
  ])

  return (
    <>
      <CHeader
        modelActiveCode="AntdV"
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
        <Row>
          <div></div>
          <Col span={22}>
            {
              list.map(info => {
                return <div className='chart-item' id={info.key} key={info.key}>
                  {info.component}
                </div>
              })
            }
          </Col>
          <Col span={2}>
            <Anchor
              affix={{
                className: "aaasss"
              }}
              // getContainer	指定滚动的容器
              // getContainer={()=>document.querySelector(".ant-pro-global-header-logo")}
              // 到达下一块链接区域的距离 60/2 锚点定位执行
              bounds={60}
              getCurrentAnchor={(activeLink) => {
                console.log('activeLink ', activeLink)
                return activeLink
              }}
              // position: fixed top 100px
              offsetTop={100}
              // onClick={()=>{
              // console.log(' >>>>>>.222', )
              // }}    
              // scrollTo={()=>{
              // console.log(' >>>>>>. scrollTo', )
              // }}
              showInkInFixed={false}
              items={list}
            />
          </Col>
        </Row>


      </div>
    </>
  );
}

export default Index;
