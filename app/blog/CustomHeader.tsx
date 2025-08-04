
"use client"
import {useRouter} from "@bprogress/next"
import Lottie from "react-lottie";
import logoAnimateJson from "@/assets/json/logo.json";
import { Layout, Menu, MenuProps, Space } from "antd";
import { useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
const { Header, Content, Footer } = Layout;

  const items: MenuProps['items'] = [
    {
      label: '技术分类',
      key: 'categoryListIndex',
      // icon: <AppstoreOutlined />,
    },
    {
      label: 'canvas',
      key: 'canvas',
      // icon: <AppstoreOutlined />,
    },
    {
      label: 'Threejs',
      key: 'threejs',
      // icon: <AppstoreOutlined />,
    },
    {
      label: 'flip动画',
      key: 'flip',
      // icon: <AppstoreOutlined />,
    },
    {
      label: 'AntdV',
      key: 'AntdV',
      // icon: <AppstoreOutlined />,
      children: [
        // {
        //   label: 'hierarchy',
        //   key: 'hierarchy',
        //   // icon: <AppstoreOutlined />,
        // },
        {
          label: 'X6js',
          key: 'X6js',
          // icon: <AppstoreOutlined />,
        },
        {
          label: 'g2',
          key: 'charts',
          // icon: <AppstoreOutlined />,
        },
      ]

    },
  ]

 export default (props:{modelActiveCode?:string,renderBack?:Function})=> {
  const nextRouter = useRouter()
  const {modelActiveCode}  =props
  const [activeCode, setActiveCode] = useState(modelActiveCode||"")
  return    <Header
    style={{
     position: 'sticky',
     top: 0,
     zIndex: 1,
     width: '100%',
     display: 'flex',
     alignItems: 'center',
     background: '#fff',
     padding: "0 16px"
    }}
   >
    <div style={{width: 100, height: 60, marginRight: 16}}>
    <Lottie options={{
      animationData: logoAnimateJson,
    }} isClickToPauseDisabled={true} width={100} height={60} ></Lottie>
    </div>

    <h1
     style={{fontSize: 16, fontWeight: 600}}
    >宋玉彬的 Blog</h1>
    <Space className='custom-header-right'>
     {props.renderBack&&props.renderBack()}
     <Menu
      className="custom-header-menu"
   selectedKeys={[activeCode]}
   onSelect={({selectedKeys})=> {
    // console.log('selectedKeys',selectedKeys)
    // setActiveCode(selectedKeys[0])
    const urlStr = selectedKeys[0] === "categoryListIndex"?'':selectedKeys[0]
    nextRouter.push(`/blog/${urlStr}`)

   }}
     theme="light"
     mode="horizontal"
     defaultSelectedKeys={['2']}
     items={items}
    />
    </Space>
   </Header>
 }