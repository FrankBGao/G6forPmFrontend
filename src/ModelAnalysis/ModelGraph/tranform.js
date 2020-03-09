// This function is the interface for backend server data.
// This function transfers the data for G6, add some style for nodes and edges
export const tranform = (data)=>{
    const nodes = data.nodes;
    const edges = data.edges.map((edge)=>{
        return {
            source: edge.source,
            target: edge.target,
            label: edge.data.freq,
            labelCfg: {
                refY: 10,
            },
            shape: edge.source === edge.target ? "loop":'cubic-horizontal',
            style: {
                stroke: '#8abccf',
                lineWidth:3,
                //lineAppendWidth:lineWidthMap[edge.data.type]*10,
                endArrow: {
                    path: 'M 5,0 L -5,-5 L -5,5 Z', // 自定义箭头路径
                    d: 5 // 偏移量
                }
            }
        }
    });

    return {
        nodes:nodes,
        edges:edges
    }
};