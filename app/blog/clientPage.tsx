"use client"
import React, { Suspense } from 'react';
import { Breadcrumb, ConfigProvider, Layout, Menu, MenuProps, Space, theme, Button, Alert } from 'antd';

import CategoryList from '../components/pc/CategoryList';
import Cheader from "@/app/blog/CustomHeader"
import "./index.scss"
import Marquee from 'react-fast-marquee';
const { Content, Footer } = Layout;
const App: React.FC = (props) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    // <ConfigProvider>
    <Layout>
      <Cheader modelActiveCode='categoryListIndex' />
      <Alert
        style={{ position: "sticky", top: "56px", zIndex: 2 }}
        type='success'
        banner
        message={
          <Marquee pauseOnHover gradient={false}>
            本站点采用 {<span className='syb-hight'>Next.js</span>} 构建，欢迎来到{<span className='syb-hight'>宋玉彬</span>}的Blog，一起记录前端美好生活~
          </Marquee>
        }
      />
      <Content style={{ padding: '0 48px' }}>

        <div

          style={{
            padding: ' 0 24px 24px',
            minHeight: 380,
            // background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <CategoryList />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <Button type='link' href='https://beian.miit.gov.cn/' target='_blank'>豫ICP备19041297号</Button>{new Date().getFullYear()} Blog Web
      </Footer>
    </Layout>
    // </ConfigProvider>

  );
};

export default App;