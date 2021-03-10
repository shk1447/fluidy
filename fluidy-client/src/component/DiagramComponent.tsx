import React, {createRef, useEffect} from 'react';
import cytoscape from 'cytoscape'

const DiagramComponent = (props: any)=>{
    const ref = createRef<HTMLDivElement>();    
    useEffect(()=>{
        console.log("얄루")
        if (!ref.current) {
            return;
        }        
        let graph: any = null
        graph = cytoscape({
            container: ref.current, // container to render in          
            elements: [
                // Nodes                
                {"data":{"id":"master"}},
                {"data":{"id":"masterFoo","parent":"master"}},
                {"data":{"id":"masterComp","parent":"master"}},
                {"data":{"id":"masterReverb","parent":"master"}},
                {"data":{"id":"masterLimiter","parent":"master"}},
                {"data":{"id":"masterOut","parent":"master"}},
                
                {"data":{"id":"main"}},
                {"data":{"id":"oscillator","parent":"main"}},
                {"data":{"id":"filter1","parent":"main"}},
                {"data":{"id":"filter2","parent":"main"}},
                {"data":{"id":"envelope","parent":"main"}},
                {"data":{"id":"volume","parent":"main"}},
        
                {"data":{"id":"modulation1","parent":"main"}},
                {"data":{"id":"mod1In","parent":"modulation1"}},
                {"data":{"id":"mod1Scale","parent":"modulation1"}},
                {"data":{"id":"mod1Ratio","parent":"modulation1"}},
                {"data":{"id":"mod1Mul","parent":"modulation1"}},
                {"data":{"id":"mod1Out","parent":"modulation1"}},
        
                {"data":{"id":"modulation2","parent":"main"},renderedPosition: { x: 200, y: 200 }},
                {"data":{"id":"mod2In","parent":"modulation2"}},
                {"data":{"id":"mod2Scale","parent":"modulation2"}},
                {"data":{"id":"mod2Ratio","parent":"modulation2"}},
                {"data":{"id":"mod2Mul","parent":"modulation2"}},
                {"data":{"id":"mod2Out","parent":"modulation2"}},
        
                // Edges
        
                {"data":{"id":"w0","source":"oscillator","target":"filter1"}},
                {"data":{"id":"w1","source":"oscillator","target":"filter2"}},
                {"data":{"id":"w2","source":"filter1","target":"envelope"}},
                {"data":{"id":"w3","source":"filter2","target":"envelope"}},
                {"data":{"id":"w4","source":"envelope","target":"volume"}},
        
                {"data":{"id":"w5","source":"mod1In","target":"mod1Scale"}},
                {"data":{"id":"w6","source":"mod2In","target":"mod2Scale"}},
                {"data":{"id":"w7","source":"mod1Scale","target":"mod1Ratio"}},
                {"data":{"id":"w8","source":"mod2Scale","target":"mod2Ratio"}},
                {"data":{"id":"w9","source":"mod1Ratio","target":"mod1Mul"}},
                {"data":{"id":"w10","source":"mod2Ratio","target":"mod2Mul"}},
                {"data":{"id":"w11","source":"mod1Mul","target":"mod1Out"}},
                {"data":{"id":"w12","source":"mod2Mul","target":"mod2Out"}},
                
                {"data":{"id":"w13","source":"masterComp","target":"masterReverb"}},
                {"data":{"id":"w14","source":"masterReverb","target":"masterLimiter"}},
                {"data":{"id":"w15","source":"masterLimiter","target":"masterOut"}},
        
                {"data":{"id":"w16","source":"volume","target":"masterComp"}},
                {"data":{"id":"w17","source":"mod1Out","target":"filter1"}},
                {"data":{"id":"w18","source":"mod1Out","target":"filter2"}},
                {"data":{"id":"w19","source":"mod2Out","target":"envelope"}},                
            ],
            
          style: [ // the stylesheet for the graph
            {
              selector: 'node',
              style: {
                // 'background-color': '#666',
                'label': 'data(id)'
              }
            },
        
            {
              selector: 'edge',
              style: {
                        'curve-style': "bezier",
                'width': 4,
                'line-color': '#ccc',
                'target-arrow-color': '#ccc',
                'target-arrow-shape': 'triangle'
              }
            }
          ],
        
          layout: {
            name: 'grid',
            rows: 6,
            cols: 5
          }	
          
          });                  

        //fit layout
        graph.renderer().data.canvases.forEach((canvas: HTMLCanvasElement)=> {
            canvas.style.left = "0px";
            canvas.style.top = "0px";
        })
        return ()=> graph.destroy();
    }, []);

    return(
        <div ref={ref} style={{height: "100%"}}>

        </div>
    )
}

export default DiagramComponent;