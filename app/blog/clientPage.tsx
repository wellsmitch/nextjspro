"use client"
import React, { Suspense } from 'react';
import { Breadcrumb, ConfigProvider, Layout, Menu, MenuProps, theme } from 'antd';
import Lottie from "react-lottie";
import logoAnimateJson from "@/assets/json/logo.json";
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
          key: 'g2',
          // icon: <AppstoreOutlined />,
        },
      ]

    },
  ]


const App: React.FC = ({children}:any) => {
 const {
  token: { colorBgContainer, borderRadiusLG },
 } = theme.useToken();

 return (
  // <ConfigProvider>
  <Layout>
   <Header
    style={{
     position: 'sticky',
     top: 0,
     zIndex: 1,
     width: '100%',
     display: 'flex',
     alignItems: 'center',
     background: '#fff'
    }}
   >
    
    <Lottie options={{
      animationData: logoAnimateJson,
    }} isClickToPauseDisabled={true} width={100} height={60} ></Lottie>
    <h1
     style={{fontSize: 16, fontWeight: 600}}
    >宋玉彬的 Blog</h1>
    <Suspense fallback={<h2>loading...</h2>}>
     <Menu
     theme="light"
     mode="horizontal"
     defaultSelectedKeys={['2']}
     items={items}
     style={{ flex: 1, minWidth: 0 }}
    />
    </Suspense>
   </Header>
   <Content style={{ padding: '0 48px' }}>

    <div
    
     style={{
      padding: 24,
      minHeight: 380,
      // background: colorBgContainer,
      borderRadius: borderRadiusLG,
     }}
    >
     {children}
    </div>
   </Content>
   <Footer style={{ textAlign: 'center' }}>
    Ant Design ©{new Date().getFullYear()} Created by Ant UED
   </Footer>
  </Layout>
  // </ConfigProvider>

 );
};

export default App;