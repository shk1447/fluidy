import React, {createRef, useEffect, useRef, useState} from 'react';
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
  const [collapse, setCollapse] = useState<boolean>(false);;
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
        {/* layout 1 : 꿀렁임 없음 여기다 뭐라도 넣을라치면 높이 이런거 다 계산해야 함*/}
        <div style={{width: "96%", height: "100vh"}}>
          <DiagramComponent></DiagramComponent>
        </div>
        {/* layout 2 : 꿀렁임 있음 대신 레이아웃 구성이 편할지도 */}
        {/* <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0, backgroundColor: 'gray', height : '6.6vh'}}>
            <Text>Main App bar</Text>
          </Header>
          <Content style={{ margin: '0 0px', border : "1px solid cyan", height: "93.4vh"}}>                    
            <DiagramComponent></DiagramComponent>                            
          </Content>          
        </Layout> */}
        
        
      </Layout>
    );
}


export default LayoutComponent