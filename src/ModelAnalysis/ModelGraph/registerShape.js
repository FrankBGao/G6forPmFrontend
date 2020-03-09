import G6 from '@antv/g6';

// this is from the G6's example
// in this project, we haven't used these functions

const lineWidthMap = {
    "强": 5,
    "弱": 3,
    // sn: 5,
    // s: 3,
    // n: 3,
    // 's-long': 1,
    // 'n-long': 1,
};

var colorMap = {
    "强": '#666',
    "弱": '#8abccf',
    // sn: '#666',
    // s: '#8abccf',
    // n: '#8abccf',
    // 's-long': '#FF9BA2',
    // 'n-long': '#FF9BA2',
};

G6.registerEdge('quadratic2', {
    draw(cfg, group) {
        const startPoint = cfg.startPoint;
        const endPoint = cfg.endPoint;

        group.addShape('path', {
            attrs: {
                path: [
                  ['M', startPoint.x, startPoint.y],
                  ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, startPoint.y], // 三分之一处
                  ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, endPoint.y], // 三分之二处
                  ['L', endPoint.x, endPoint.y],
                ],
                shape: 'polyline',
                stroke: '#8abccf',//colorMap[cfg.data.type],
                lineWidth: 3,//lineWidthMap[cfg.data.type],
                labelCfg: {
                    autoRotate: true, // 边上的标签文本根据边的方向旋转
                },
                endArrow: {
                    path: 'M 5,0 L -5,-5 L -5,5 Z',
                    d: 5,
                },
            },
        });

        // amount
        var labelLeftOffset = 8;
        var labelTopOffset = 8;
        group.addShape('text', {
            attrs: {
                text: cfg.data.freq,
                x: endPoint.x / 3 + (2 / 3) * startPoint.x + labelLeftOffset,
                y: endPoint.y - labelTopOffset - 2,
                fontSize: 14,
                textAlign: 'left',
                textBaseline: 'middle',
                fill: '#000000D9',
            },
        });
    },
    //设置状态
    setState(name, value, item) {
        const group = item.getContainer();
        const shape = group.get('children')[0]; // 顺序根据 draw 时确定
        if (name === 'active') {
            if (value) {
                if (shape._attrs.stroke !== 'red') {
                    shape.attr('o_lineWidth', shape._attrs.lineWidth);
                    shape.attr('o_stroke', shape._attrs.stroke);
                }
                shape.attr('lineWidth', 7);
                shape.attr('stroke', 'red');
            } else {
                shape.attr('lineWidth', shape._attrs.o_lineWidth);
                shape.attr('stroke', shape._attrs.o_stroke);
            }
        }

        // if (name === 'selected') {
        //   debugger;
        //   if (value) {
        //     // shape.attr('o_lineWidth', shape._attrs.lineWidth);
        //     // shape.attr('o_stroke', shape._attrs.stroke);
        //     shape.attr('lineWidth', 7);
        //     shape.attr('stroke', 'red');
        //   } else {
        //     if (shape._attrs.hasAttribute("o_lineWidth")) {
        //       shape.attr('lineWidth', shape._attrs.o_lineWidth);
        //       shape.attr('stroke', shape._attrs.o_stroke);
        //     }else{
        //       shape.attr('o_lineWidth', shape._attrs.lineWidth);
        //       shape.attr('o_stroke', shape._attrs.stroke);
        //     }
        //   }
        // }
    },
});

G6.registerNode(
    'new_node',
    {
        drawShape: function drawShape(cfg, group) {
            const rect = group.addShape('rect', {
                attrs: {
                    stroke: '#5d8abd',
                    radius: [4, 4],
                    fill: cfg.infor.color,
                },
            });
            const content = cfg.name; //.replace(/(.{19})/g, '$1\n');
            const text = group.addShape('text', {
                attrs: {
                    text: content,
                    x: 0,
                    y: 0,
                    textAlign: 'center',
                    textBaseline: 'middle',
                    fill: '#000000',
                    //fontSize: 25,
                },
            });
            const bbox = text.getBBox();

            var rect_width;
            var rect_x;
            if (bbox.width + 8 < 50) {
                rect_width = 50;
                rect_x = bbox.minX - 4; // - 15
            } else {
                rect_width = bbox.width + 8;
                rect_x = bbox.minX - 4;
            }

            rect.attr({
                x: rect_x,
                y: bbox.minY - 6,
                width: rect_width,
                height: bbox.height + 12,
            });
            return rect;
        },
    },
    'single-shape',
);
