import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {import_data} from './data';
import G6 from '@antv/g6';

import Minimap from '@antv/g6/plugins/minimap';

import {NodeTooltips, EdgeToolTips, NodeContextMenu} from './component';
import './registerShape';


export default function CausalGraph(props) {
    const ref = React.useRef(null);
    let graph = null;

    //mini_map
    const mini_map = new Minimap();

    // 边tooltip坐标
    const [showEdgeTooltip, setShowEdgeTooltip] = useState(false);
    const [edgeTooltipX, setEdgeTooltipX] = useState(0);
    const [edgeTooltipY, setEdgeTooltipY] = useState(0);
    const [edgeTooltipInfo, setEdgeTooltipInfo] = useState(0);

    // 节点tooltip坐标
    const [showNodeTooltip, setShowNodeTooltip] = useState(false);
    const [nodeTooltipX, setNodeToolTipX] = useState(0);
    const [nodeTooltipY, setNodeToolTipY] = useState(0);
    const [nodeTooltipInfo, setNodeToolTipInfo] = useState(0);

    // 节点ContextMenu坐标
    const [showNodeContextMenu, setShowNodeContextMenu] = useState(false);
    const [nodeContextMenuX, setNodeContextMenuX] = useState(0);
    const [nodeContextMenuY, setNodeContextMenuY] = useState(0);
    const bindEvents = () => {
        // 监听edge上面mouse事件
        graph.on('edge:mouseenter', evt => {
            const {item, target} = evt;
            //debugger;
            const type = target.get('type');
            if (type !== 'text') {
                return;
            }

            if (!item.hasState('active')) {
                graph.setItemState(item, 'active', true);
            }

            const model = item.getModel();
            const {endPoint} = model;
            // y=endPoint.y - height / 2，在同一水平线上，x值=endPoint.x - width - 10
            const y = endPoint.y - 35;
            const x = endPoint.x - 150 - 10;
            const point = graph.getCanvasByPoint(x, y);
            setEdgeTooltipX(point.x);
            setEdgeTooltipY(point.y);
            setEdgeTooltipInfo(item);
            setShowEdgeTooltip(true);
        });

        graph.on('edge:mouseleave', evt => {
            const {item} = evt;

            if (!item.hasState('active')) {
                graph.setItemState(item, 'active', false);
            }

            setShowEdgeTooltip(false);
        });

        graph.on('edge:click', ev => {
            const edge = ev.item;
            graph.setItemState(edge, 'active', !edge.hasState('active')); // 切换选中
        });

        // 监听node上面mouse事件
        graph.on('node:mouseenter', evt => {
            const {item} = evt;
            const model = item.getModel();
            const {x, y} = model;
            const point = graph.getCanvasByPoint(x, y);

            setNodeToolTipX(point.x - 200);
            setNodeToolTipY(point.y + 15);
            setNodeToolTipInfo(model.infor);
            setShowNodeTooltip(true);
        });

        // 节点上面触发mouseleave事件后隐藏tooltip和ContextMenu
        graph.on('node:mouseleave', () => {
            setShowNodeTooltip(false);
            setShowNodeContextMenu(false);
        });

        graph.on('node:click', evt => {
            const { item } = evt;
            const model = item.getModel();
            props.nodeOnClick(model);
        });


    };
    useEffect(() => {
        if (!graph) {
            graph = new G6.Graph({
                container: ReactDOM.findDOMNode(ref.current),
                width: ReactDOM.findDOMNode(ref.current).clientWidth,
                height: window.innerHeight * 0.65,
                plugins: [mini_map],
                pixelRatio: 2,
                modes: {
                    default: ['drag-canvas', 'zoom-canvas', 'drag-node', 'activate-relations'], //, 'click-select'
                },

                defaultNode: {
                    shape: 'new_node',
                },
                defaultEdge: {
                    shape: 'quadratic2', //'cubic-horizontal',quadratic2, smooth
                },
                layout: {
                    type: 'dagre',
                    rankdir: 'LR',
                    nodesep: 30, // the distance of nodes
                    ranksep: 100,
                },
            });
        }

        graph.data(import_data);

        graph.render();
        graph.fitView();
        //graph.paint();
        bindEvents();
    }, []);

    return (
        <div ref={ref}>
            {showEdgeTooltip && <EdgeToolTips x={edgeTooltipX} y={edgeTooltipY} info={edgeTooltipInfo}/>}
            {showNodeTooltip && <NodeTooltips x={nodeTooltipX} y={nodeTooltipY} info={nodeTooltipInfo}/>}
            {showNodeContextMenu && <NodeContextMenu x={nodeContextMenuX} y={nodeContextMenuY}/>}
        </div>
    );
};

