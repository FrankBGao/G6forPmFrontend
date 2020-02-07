// import dagre from 'dagre'
//
// function disposalData(data) {
//   var g = new dagre.graphlib.Graph();
//   g.setDefaultEdgeLabel(function () {
//     return {};
//   });
//   g.setGraph({
//     rankdir: 'LR'
//   });
//   data.nodes.forEach(function (node) {
//     //node.label = node.label;
//     g.setNode(node.id, {
//       width: 150,
//       height: 50
//     });
//   });
//   data.edges.forEach(function (edge) {
//     g.setEdge(edge.source, edge.target);
//   });
//   dagre.layout(g);
//   var coord = void 0;
//   g.nodes().forEach(function (node, i) {
//     coord = g.node(node);
//     data.nodes[i].x = coord.x;
//     data.nodes[i].y = coord.y;
//     data.nodes[i].anchorPoints = [
//       [0, 0.5], [1, 0.5], [0, 0], [0, 1], [1, 0], [1, 1]//[0.5, 0], [0.5, 1]//,[1, 0.5], [0, 0.5],  // [0, 0.5], [1, 0.5]左右//[ 0.5,0], [ 0.5,1],
//     ];
//
//     // text wrap
//     data.nodes[i].label_is = data.nodes[i].name;
//
//     //if (data.nodes[i].label_is.indexOf(" ") === -1) {
//     if (/.*[\u4e00-\u9fa5]+.*$/.test(data.nodes[i].name)) {
//       const len = data.nodes[i].name.length;
//
//       const one_row = 10;
//       let index = 0;
//       var arr = [];
//       if (len % one_row !== 0 && len / one_row >= 1) {
//         while (index * one_row < len) {  // -- condition
//           arr.push(data.nodes[i].name.substring(one_row * index, one_row * (index + 1)));
//           index += 1;        // -- body
//         }
//         data.nodes[i].label_is = arr.join("\n");
//       }
//     }
//   });
//
//   g.edges().forEach(function (edge, i) {
//     coord = g.edge(edge);
//     data.edges[i].startPoint = coord.points[0];
//     data.edges[i].endPoint = coord.points[coord.points.length - 1];
//     data.edges[i].controlPoints = coord.points.slice(1, coord.points.length - 1);
//   });
//   return data;
// }

export const import_data = {
    nodes: [
        {
            id: 'id_0',
            name: '创建',
            infor: { ferq: 1384, color: '#8FC2B3' },
        },
        {
            id: 'id_1',
            name: '审批10',
            infor: { ferq: 1384, color: '#8FC2B3' },
        },
        {
            id: 'id_2',
            name: '审批8',
            infor: { ferq: 658, color: '#CFE8E3' },
        },
        {
            id: 'id_3',
            name: '审批9-[重复]',
            infor: { ferq: 53, color: '#FDFEFE' },
        },
        {
            id: 'id_4',
            name: '审批10.[重复]',
            infor: { ferq: 53, color: '#FDFEFE' },
        },
        {
            id: 'id_5',
            name: '审批9',
            infor: { ferq: 1384, color: '#8FC2B3' },
        },
        {
            id: 'id_6',
            name: '创建.[重复]',
            infor: { ferq: 205, color: '#F1F9F7' },
        },
        {
            id: 'id_7',
            name: '审批5',
            infor: { ferq: 658, color: '#CFE8E3' },
        },
        {
            id: 'id_8',
            name: '审批2',
            infor: { ferq: 1379, color: '#99C9BB' },
        },
        {
            id: 'id_9',
            name: '审批1',
            infor: { ferq: 1384, color: '#8FC2B3' },
        },
        {
            id: 'id_10',
            name: '审批3',
            infor: { ferq: 1384, color: '#8FC2B3' },
        },
        {
            id: 'id_11',
            name: '审批6',
            infor: { ferq: 658, color: '#CFE8E3' },
        },
        { id: 'id_12', name: '结束', infor: { ferq: 1384, color: '#8FC2B3' } },
        {
            id: 'id_13',
            name: '开始',
            infor: { ferq: 1384, color: '#8FC2B3' },
        },
        {
            id: 'id_14',
            name: '审批4.[重复]',
            infor: { ferq: 84, color: '#FDFEFE' },
        },
        {
            id: 'id_15',
            name: '审批4',
            infor: { ferq: 1384, color: '#8FC2B3' },
        },
        {
            id: 'id_16',
            name: '审批1.[重复]',
            infor: { ferq: 205, color: '#F1F9F7' },
        },
        {
            id: 'id_17',
            name: '审批7',
            infor: { ferq: 658, color: '#CFE8E3' },
        },
    ],
    edges: [
        { source: 'id_8', target: 'id_10', data: { type: '强' } },
        {
            source: 'id_9',
            target: 'id_15',
            data: { type: '强' },
        },
        { source: 'id_1', target: 'id_12', data: { type: '强' } },
        {
            source: 'id_15',
            target: 'id_5',
            data: { type: '强' },
        },
        { source: 'id_13', target: 'id_0', data: { type: '强' } },
        {
            source: 'id_17',
            target: 'id_2',
            data: { type: '强' },
        },
        { source: 'id_3', target: 'id_4', data: { type: '强' } },
        {
            source: 'id_6',
            target: 'id_16',
            data: { type: '强' },
        },
        { source: 'id_7', target: 'id_11', data: { type: '强' } },
        {
            source: 'id_9',
            target: 'id_8',
            data: { type: '强' },
        },
        { source: 'id_11', target: 'id_17', data: { type: '强' } },
        {
            source: 'id_5',
            target: 'id_1',
            data: { type: '强' },
        },
        { source: 'id_0', target: 'id_9', data: { type: '强' } },
        {
            source: 'id_2',
            target: 'id_5',
            data: { type: '弱' },
        },
        { source: 'id_4', target: 'id_12', data: { type: '弱' } },
        {
            source: 'id_14',
            target: 'id_5',
            data: { type: '弱' },
        },
        { source: 'id_16', target: 'id_14', data: { type: '弱' } },
        {
            source: 'id_1',
            target: 'id_3',
            data: { type: '弱' },
        },
        { source: 'id_10', target: 'id_17', data: { type: '弱' } },
        {
            source: 'id_9',
            target: 'id_6',
            data: { type: '弱' },
        },
        { source: 'id_15', target: 'id_7', data: { type: '弱' } },
    ],
    // residual: {
    //   batting: 0.8303390295354295,
    //   case_correct: 0.9994781631342325,
    //   entropy: 2.4313119004205666,
    //   next_correct: 0.6772437561635537,
    // },
};
//const graph_data = disposalData(import_data);
//export default import_data;


// // import dagre from 'dagre'
// //
// // function disposalData(data) {
// //   var g = new dagre.graphlib.Graph();
// //   g.setDefaultEdgeLabel(function () {
// //     return {};
// //   });
// //   g.setGraph({
// //     rankdir: 'LR'
// //   });
// //   data.nodes.forEach(function (node) {
// //     //node.label = node.label;
// //     g.setNode(node.id, {
// //       width: 150,
// //       height: 50
// //     });
// //   });
// //   data.edges.forEach(function (edge) {
// //     g.setEdge(edge.source, edge.target);
// //   });
// //   dagre.layout(g);
// //   var coord = void 0;
// //   g.nodes().forEach(function (node, i) {
// //     coord = g.node(node);
// //     data.nodes[i].x = coord.x;
// //     data.nodes[i].y = coord.y;
// //     data.nodes[i].anchorPoints = [
// //       [0, 0.5], [1, 0.5], [0, 0], [0, 1], [1, 0], [1, 1]//[0.5, 0], [0.5, 1]//,[1, 0.5], [0, 0.5],  // [0, 0.5], [1, 0.5]左右//[ 0.5,0], [ 0.5,1],
// //     ];
// //
// //     // text wrap
// //     data.nodes[i].label_is = data.nodes[i].name;
// //
// //     //if (data.nodes[i].label_is.indexOf(" ") === -1) {
// //     if (/.*[\u4e00-\u9fa5]+.*$/.test(data.nodes[i].name)) {
// //       const len = data.nodes[i].name.length;
// //
// //       const one_row = 10;
// //       let index = 0;
// //       var arr = [];
// //       if (len % one_row !== 0 && len / one_row >= 1) {
// //         while (index * one_row < len) {  // -- condition
// //           arr.push(data.nodes[i].name.substring(one_row * index, one_row * (index + 1)));
// //           index += 1;        // -- body
// //         }
// //         data.nodes[i].label_is = arr.join("\n");
// //       }
// //     }
// //   });
// //
// //   g.edges().forEach(function (edge, i) {
// //     coord = g.edge(edge);
// //     data.edges[i].startPoint = coord.points[0];
// //     data.edges[i].endPoint = coord.points[coord.points.length - 1];
// //     data.edges[i].controlPoints = coord.points.slice(1, coord.points.length - 1);
// //   });
// //   return data;
// // }
//
// export const import_data = {
//   nodes: [
//     {
//       id: 'id_0',
//       name: '\u521b\u5efa\u62a5\u5e9f\u7533\u8bf7',
//       infor: { ferq: 1384, color: '#8FC2B3' },
//     },
//     {
//       id: 'id_1',
//       name: '\u5ba1\u627910-\u5b50\u516c\u53f8\u8d22\u52a1\u5ba1\u6279',
//       infor: { ferq: 1384, color: '#8FC2B3' },
//     },
//     {
//       id: 'id_2',
//       name: '\u5ba1\u62798-\u603b\u516c\u53f8\u8d22\u52a1\u5ba1\u6279',
//       infor: { ferq: 658, color: '#CFE8E3' },
//     },
//     {
//       id: 'id_3',
//       name: '\u5ba1\u62799-\u5b50\u516c\u53f8\u8d22\u52a1\u5ba1\u6279.[重复]',
//       infor: { ferq: 53, color: '#FDFEFE' },
//     },
//     {
//       id: 'id_4',
//       name: '\u5ba1\u627910-\u5b50\u516c\u53f8\u8d22\u52a1\u5ba1\u6279.[重复]',
//       infor: { ferq: 53, color: '#FDFEFE' },
//     },
//     {
//       id: 'id_5',
//       name: '\u5ba1\u62799-\u5b50\u516c\u53f8\u8d22\u52a1\u5ba1\u6279',
//       infor: { ferq: 1384, color: '#8FC2B3' },
//     },
//     {
//       id: 'id_6',
//       name: '\u521b\u5efa\u62a5\u5e9f\u7533\u8bf7.[重复]',
//       infor: { ferq: 205, color: '#F1F9F7' },
//     },
//     {
//       id: 'id_7',
//       name: '\u5ba1\u62795-\u603b\u516c\u53f8\u5ba1\u6279',
//       infor: { ferq: 658, color: '#CFE8E3' },
//     },
//     {
//       id: 'id_8',
//       name: '\u5ba1\u62792-\u5b50\u516c\u53f8\u8d22\u52a1\u5ba1\u6279',
//       infor: { ferq: 1379, color: '#99C9BB' },
//     },
//     {
//       id: 'id_9',
//       name: '\u5ba1\u62791-\u5b50\u516c\u53f8\u5ba1\u6279',
//       infor: { ferq: 1384, color: '#8FC2B3' },
//     },
//     {
//       id: 'id_10',
//       name: '\u5ba1\u62793-\u5b50\u516c\u53f8\u8d22\u52a1\u5ba1\u6279',
//       infor: { ferq: 1384, color: '#8FC2B3' },
//     },
//     {
//       id: 'id_11',
//       name: '\u5ba1\u62796-\u603b\u516c\u53f8\u5ba1\u6279',
//       infor: { ferq: 658, color: '#CFE8E3' },
//     },
//     { id: 'id_12', name: 'e', infor: { ferq: 1384, color: '#8FC2B3' } },
//     {
//       id: 'id_13',
//       name: 's',
//       infor: { ferq: 1384, color: '#8FC2B3' },
//     },
//     {
//       id: 'id_14',
//       name: '\u5ba1\u62794-\u5b50\u516c\u53f8\u5ba1\u6279.[重复]',
//       infor: { ferq: 84, color: '#FDFEFE' },
//     },
//     {
//       id: 'id_15',
//       name: '\u5ba1\u62794-\u5b50\u516c\u53f8\u5ba1\u6279',
//       infor: { ferq: 1384, color: '#8FC2B3' },
//     },
//     {
//       id: 'id_16',
//       name: '\u5ba1\u62791-\u5b50\u516c\u53f8\u5ba1\u6279.[重复]',
//       infor: { ferq: 205, color: '#F1F9F7' },
//     },
//     {
//       id: 'id_17',
//       name: '\u5ba1\u62797-\u603b\u516c\u53f8\u8d22\u52a1\u5ba1\u6279',
//       infor: { ferq: 658, color: '#CFE8E3' },
//     },
//   ],
//   edges: [
//     { source: 'id_8', target: 'id_10', data: { type: 'sn' } },
//     {
//       source: 'id_9',
//       target: 'id_15',
//       data: { type: 'sn' },
//     },
//     { source: 'id_1', target: 'id_12', data: { type: 'sn' } },
//     {
//       source: 'id_15',
//       target: 'id_5',
//       data: { type: 'sn' },
//     },
//     { source: 'id_13', target: 'id_0', data: { type: 'sn' } },
//     {
//       source: 'id_17',
//       target: 'id_2',
//       data: { type: 'sn' },
//     },
//     { source: 'id_3', target: 'id_4', data: { type: 'sn' } },
//     {
//       source: 'id_6',
//       target: 'id_16',
//       data: { type: 'sn' },
//     },
//     { source: 'id_7', target: 'id_11', data: { type: 'sn' } },
//     {
//       source: 'id_9',
//       target: 'id_8',
//       data: { type: 'sn' },
//     },
//     { source: 'id_11', target: 'id_17', data: { type: 'sn' } },
//     {
//       source: 'id_5',
//       target: 'id_1',
//       data: { type: 'sn' },
//     },
//     { source: 'id_0', target: 'id_9', data: { type: 'sn' } },
//     {
//       source: 'id_2',
//       target: 'id_5',
//       data: { type: 's' },
//     },
//     { source: 'id_4', target: 'id_12', data: { type: 's' } },
//     {
//       source: 'id_14',
//       target: 'id_5',
//       data: { type: 's' },
//     },
//     { source: 'id_16', target: 'id_14', data: { type: 'n' } },
//     {
//       source: 'id_1',
//       target: 'id_3',
//       data: { type: 'n' },
//     },
//     { source: 'id_10', target: 'id_17', data: { type: 'n' } },
//     {
//       source: 'id_9',
//       target: 'id_6',
//       data: { type: 'n' },
//     },
//     { source: 'id_15', target: 'id_7', data: { type: 'n' } },
//   ],
//   residual: {
//     batting: 0.8303390295354295,
//     case_correct: 0.9994781631342325,
//     entropy: 2.4313119004205666,
//     next_correct: 0.6772437561635537,
//   },
// };
// //const graph_data = disposalData(import_data);
// //export default import_data;
