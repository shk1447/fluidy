import { Radio } from 'antd';
const DocumentComponent = ()=>{
    return (
        <>
            <header className ="el-header" style={{height: "60px", backgroundColor:"orange"}}>              
                <Radio.Group defaultValue="b" size="large">
                <Radio.Button value="b">Document</Radio.Button>                
                </Radio.Group>
            </header>
            <h1>Document</h1>
        </>
    )
}
export default DocumentComponent;