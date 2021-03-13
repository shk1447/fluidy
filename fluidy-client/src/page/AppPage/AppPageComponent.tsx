import logo from './logo.svg';
import './AppPage.css';
import * as antd from 'antd'
import * as icons from '@ant-design/icons';
import { Tabs } from 'antd';
import { Route, Link, Switch, useRouteMatch } from 'react-router-dom';
import FlowChartComponent from './Flow/FlowChart/FlowChartComponent';
import { Radio } from 'antd';
import React from 'react';
import { ApartmentOutlined, AppstoreOutlined, ContainerOutlined, MailOutlined } from '@ant-design/icons';
import DocumentComponent from './Document/DocumentComponent';
import FlowComponent from './Flow/FlowComponent';

const { TabPane } = Tabs;

const { Menu} = antd;
const { 
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
 } = icons;

const { SubMenu } = Menu;

function AppPageComponent() {
  let { path, url } = useRouteMatch();
  return (
    <div className="App">
      <section className="el-container" style={{height: "100vh"}}>
        <section className="el-container is-vertical">
          <header className ="el-header" style={{height: "60px"}}>
            Header
          </header>
          <section className="el-container">
            <aside className="el-aside">
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
              <Switch>
                <Route path={`${path}/Document`} component={DocumentComponent}/>
                <Route path={`${path}/Flow`} component={FlowComponent}/> 
              </Switch>        
                   
            </section>
          </section>
        </section> 
        <aside className="el-aside" style={{backgroundColor:"green"}}>
          <Menu
            defaultSelectedKeys={['1']}              
            mode="inline"
            theme="light"
            style={{ width: '50px', height: '100%'}}
            inlineCollapsed={true}
          >
            <Menu.Item key="1" icon={<ApartmentOutlined />} style={{margin : "0px 0px 0px 0px"}}>
              <Link to={`${path}/Flow/FlowChart`}>Flow Chart</Link>              
            </Menu.Item>
            <Menu.Item key="2" icon={<FileOutlined />} style={{margin : "0px 0px 0px 0px"}}>
              <Link to={`${path}/Document`}>Document</Link>              
            </Menu.Item>                
          </Menu>          
        </aside>
      </section>
    </div>
  );
}

export default AppPageComponent;
