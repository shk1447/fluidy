import logo from './logo.svg';
import './AppPage.css';
import * as antd from 'antd'
import * as icons from '@ant-design/icons';
import { Tabs } from 'antd';
import { Route, Link, Switch, useRouteMatch } from 'react-router-dom';
import FlowChartComponent from './Flow/FlowChart/FlowChartComponent';
import { Radio } from 'antd';
import React, {createRef, useEffect} from 'react';
import { ApartmentOutlined, AppstoreOutlined, ContainerOutlined, MailOutlined } from '@ant-design/icons';
import DocumentComponent from './Document/DocumentComponent';
import FlowComponent from './Flow/FlowComponent';
import $ from 'jquery'
import '../../../node_modules/jstree/dist/jstree'
import '../../../node_modules/jstree/dist/themes/default/style.min.css'
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
  const ref = createRef<HTMLDivElement>();
  useEffect(()=>{    
    ($(ref.current as any) as any).jstree({ 'core' : {
      'data' : [
         'Simple root node',
         {
           'text' : 'Root node 2',
           'state' : {
             'opened' : true,
             'selected' : true
           },
           'children' : [
             { 'text' : 'Child 1' },
             'Child 2',
             {'text': 'Child 3', 'children' : [
               'child 4'
             ]}
           ]
        }
      ]
  } });
  }, [])
  return (
    <div className="App">
      <section className="el-container" style={{height: "100vh"}}>
        <section className="el-container is-vertical">
          <header className ="el-header" style={{height: "60px"}}>
            Header
          </header>
          <section className="el-container">
            <aside className="el-aside" style={{ width: '200px', height: '100%'}}>
              <div className="tree-container" ref={ref} style={{width: '100%'}}>

              </div>              
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
