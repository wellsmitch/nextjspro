"use client"
import React, { Suspense } from 'react';
import {
  Breadcrumb,
  Image as AntdImage,
  ConfigProvider, Layout, Menu, MenuProps, Space, theme, Button, Alert, Affix, FloatButton, Typography, Popover
} from 'antd';

import CategoryList from '../components/pc/CategoryList';
import Cheader from "@/app/blog/CustomHeader"
import "./index.scss"
import Marquee from 'react-fast-marquee';
import { MailOutlined, WechatFilled } from '@ant-design/icons';
const { Content, Footer } = Layout;
const App: React.FC = (props) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [containerRef, setContainer] = React.useState<HTMLDivElement | null>(null);

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
      <Content style={{ padding: '0 48px' }} ref={(d: HTMLDivElement) => {
        d && setContainer(d)
      }}>

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
      <FloatButton.Group shape="circle">
        <FloatButton.BackTop duration={500} visibilityHeight={500} />
        <Popover placement="left" content={() => {

          return <>
            <Typography.Paragraph style={{ margin: 0 }} copyable >sybabjj@163.com</Typography.Paragraph>
          </>
        }}>
          <FloatButton badge={{ dot: true }} icon={<MailOutlined />} />
        </Popover>

        <Popover placement="left" content={() => {

          return <>
            <p style={{ textAlign: "center" }}>客官，来个赏吧~</p>
            <AntdImage style={{ width: 150 }} src={"/passets/images/allowpay.jpg"} />
          </>
        }}>
          <FloatButton badge={{ dot: true }} icon={<WechatFilled />} />
        </Popover>


      </FloatButton.Group>
      <Footer style={{ textAlign: 'center' }}>
        <Button type='link' href='https://beian.miit.gov.cn/' target='_blank'>豫ICP备19041297号</Button>{new Date().getFullYear()} Blog Web
      </Footer>
    </Layout>
    // </ConfigProvider>

  );
};

export default App;