"use client"
import React, { Suspense } from 'react';
import { Breadcrumb, ConfigProvider, Layout, Menu, MenuProps, Space, theme, Button} from 'antd';

import CategoryList from '../components/pc/CategoryList';
import Cheader from "@/app/blog/CustomHeader"
import "./index.scss"
const { Content, Footer } = Layout;
const App: React.FC = (props) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    // <ConfigProvider>
    <Layout>
      <Cheader modelActiveCode='categoryListIndex' />
      <Content style={{ padding: '0 48px' }}>

        <div

          style={{
            padding: 24,
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