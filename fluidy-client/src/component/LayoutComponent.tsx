import React, {useState} from 'react';
import * as antd from 'antd'
import * as icons from '@ant-design/icons';
import './LayoutComponent.css';
const {Layout, Menu, Typography, Row, Col} = antd;
const { 
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
 } = icons;

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
const { Text } = Typography;
const LayoutComponent = () => { 
  const [collapse, setCollapse] = useState(false)
  const onCollapse = (collapsed: boolean) => {
    setCollapse(collapsed);
  };
    return (
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapse} onCollapse={onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" >
              <Menu.Item key="1" icon={<PieChartOutlined />} style={{margin: '0px 0px 0px 0px'}}>
                Option 1
              </Menu.Item>
              <Menu.Item key="2" icon={<DesktopOutlined />} style={{margin: '0px 0px 0px 0px'}}>
                Option 2
              </Menu.Item>
              <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                <Menu.Item key="3">Tom</Menu.Item>
                <Menu.Item key="4">Bill</Menu.Item>
                <Menu.Item key="5">Alex</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                <Menu.Item key="6">Team 1</Menu.Item>
                <Menu.Item key="8">Team 2</Menu.Item>
              </SubMenu>
              <Menu.Item key="9" icon={<FileOutlined />}>
                Files
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0, backgroundColor: 'gray' }}>
              <Text>Main App bar</Text>
            </Header>
            <Content style={{ margin: '0 0px' }}>        
              <Row style={{ padding: 0, backgroundColor: 'cyan', textAlign : "center"}}>
                <Col span={24}>
                  <Text>Tool Bar</Text>
                </Col>
              </Row>
              {/* <Header className="site-layout-background" style={{ padding: 0, backgroundColor: 'cyan', height: "40px", justifyContent: "center" , verticalAlign : "center"}}>
                <Text>Ant Design (default)</Text>
              </Header> */}
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                Bill is a cat.
              </div>
            </Content>          
          </Layout>
        </Layout>
      );
}


export default LayoutComponent