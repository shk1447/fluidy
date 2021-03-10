import React, {useEffect, useRef, useState} from 'react';
import * as antd from 'antd'
import * as icons from '@ant-design/icons';
import './LayoutComponent.css';
import DiagramComponent from './DiagramComponent'

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
      <Sider defaultCollapsed={true} reverseArrow = {true} onCollapse={onCollapse}>
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
          <Header className="site-layout-background" style={{ padding: 0, backgroundColor: 'gray', height : '6.6vh'}}>
            <Text>Main App bar</Text>
          </Header>
          <Content style={{ margin: '0 0px', border : "5px solid cyan", height: "93.4vh"}}>        
            {/* <Row style={{ padding: 0, backgroundColor: 'cyan', textAlign : "center"}}>
              <Col span={24}>
                <Text>Tool Bar</Text>
              </Col>                
            </Row>                             */}
            {/* <div className="site-layout-background" style={{ width: "100%", height : "100%"}}>
                              
            </div>               */}
            {/* <CytoscapeComponent elements={[
              { data: { id: 'one', label: 'Node 1' }, position: { x: 0, y: 0 } },
              { data: { id: 'two', label: 'Node 2' }, position: { x: 100, y: 0 } },
              { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } }
            ]} style={ { width: '800px', height: '600px' } } />;    
             */}
            <DiagramComponent></DiagramComponent>
          </Content>          
        </Layout>
        
      </Layout>
    );
}


export default LayoutComponent