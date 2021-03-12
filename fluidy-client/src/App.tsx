import React from 'react';
import logo from './logo.svg';
import './App.css';
import LayoutComponent from './component/LayoutComponent';
import * as antd from 'antd'
import * as icons from '@ant-design/icons';
import DiagramComponent from './component/DiagramComponent';
import { Radio, Tabs } from 'antd';
const { TabPane } = Tabs;

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
function App() {
  return (
    <div className="App">
      {/* <LayoutComponent></LayoutComponent> */}
      <section className="el-container is-vertical" style={{height: "100vh"}}>
        <header className ="el-header" style={{height: "60px"}}>
          Header
        </header>
        <section className="el-container">
          <aside className="el-aside" style={{width: "200px"}}>
          <Menu mode="inline" style={{ width: 200 }}>
            <SubMenu key="sub1" title="Navigation One">
              <Menu.Item key="1">Option 1</Menu.Item>
              <Menu.Item key="2">Option 2</Menu.Item>
              <Menu.Item key="3">Option 3</Menu.Item>
              <Menu.Item key="4">Option 4</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title="Navigation Two">
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
              <SubMenu key="sub3" title="Submenu">
                <Menu.Item key="7">Option 7</Menu.Item>
                <Menu.Item key="8">Option 8</Menu.Item>
              </SubMenu>
            </SubMenu>
            <SubMenu key="sub4" title="Navigation Three">
              <Menu.Item key="9">Option 9</Menu.Item>
              <Menu.Item key="10">Option 10</Menu.Item>
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </Menu>
          </aside>
          <section className="el-container is-vertical">            
            <header className ="el-header" style={{height: "60px", backgroundColor:"orange"}}>              
              <Radio.Group defaultValue="a" size="large">
                <Radio.Button value="a">Flow Chart</Radio.Button>
                <Radio.Button value="b">Document</Radio.Button>                
              </Radio.Group>
            </header>             
            <main className="el-main">
              <DiagramComponent></DiagramComponent>
            </main> 
                       
          </section>
          <aside className="el-aside" style={{width: "300px"}}>
            Aside
          </aside>
          <aside className="el-aside" style={{width: "50px", backgroundColor:"green"}}>
            Aside
          </aside>
        </section>
      </section>
    </div>
  );
}

export default App;
