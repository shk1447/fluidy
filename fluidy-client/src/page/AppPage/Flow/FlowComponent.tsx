import { Radio } from 'antd';
import { Route, RouteComponentProps, Link, Switch, useRouteMatch  } from 'react-router-dom';
import FlowChartDocument from './FlowChartDocument/FlowChartDocument';
import FlowChartComponent from './FlowChart/FlowChartComponent';

const FlowComponent = () =>{
    let { path, url } = useRouteMatch();
    console.log(path);
    return (
        <>            
            <header className ="el-header" style={{height: "60px", backgroundColor:"orange"}}>              
                <Radio.Group defaultValue="a" size="large">
                    <Radio.Button value="a">
                        <Link to={`${path}/FlowChart`}>Flow Chart</Link> 
                    </Radio.Button>
                    <Radio.Button value="b">
                        <Link to={`${path}/FlowChartDocument`}>Flow Document</Link>
                    </Radio.Button>                
                </Radio.Group>
            </header>
            <Route path={`${path}/FlowChart`} component={FlowChartComponent}/>
            <Route path={`${path}/FlowChartDocument`} component={FlowChartDocument}/>
        </>
    )
}

export default FlowComponent;