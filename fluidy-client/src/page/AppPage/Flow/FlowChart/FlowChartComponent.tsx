import DiagramComponent from '../../../../component/Diagram/DiagramComponent';

const FlowChartComponent = () =>{    
    console.log("뿅")
    return (
        <>  
            <section className="el-container">                
                <main className="el-main">
                    <DiagramComponent></DiagramComponent>               
                </main>   
                <aside className="el-aside" style={{width: "300px"}}>
                Aside
                </aside>
            </section> 
        </>
    )
}

export default FlowChartComponent;