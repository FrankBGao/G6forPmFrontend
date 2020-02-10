import React, {useState} from 'react';
import CausalModel from "./ModelAnalysis"
import {Row, Col, Card, Button, message, PageHeader, Input} from "antd";
import "antd/dist/antd.css";
import service from "./service/index"

// const Page: React.FC = props => {
class Page extends React.Component {

    // const [state, setState] = useState({
    //     node: [] as { title: string }[],
    //     nodeNames: [] as string[],//title: 'Ant Design Title 1'
    // });
    state = {
        node: [] as { title: string }[],
        nodeNames: [] as string[],
        groupName: "" as string,
        graphData: {} as any,
        graph: "" as any
    };

    nodeOnClick = (model: any) => {
        if(this.state.nodeNames.indexOf(model.name) != -1){
            return
        }
        this.setState({
            node: this.state.node.concat([{title: model.name}]),
            nodeNames: this.state.nodeNames.concat([model.name]),
        });
    };


    Clean = () => {
        this.setState({
            node: [] as { title: string }[],
            nodeNames: [] as string[],//title: 'Ant Design Title 1'
        });
    };

    Send = async () => {
        const data = await service.queryNodes(this.state.groupName, this.state.nodeNames);//#frank,
        message.info("Sent to the server");

        this.setState({
            node: [] as { title: string }[],
            nodeNames: [] as string[],//title: 'Ant Design Title 1'
            groupName: "" as string,
            graphData: data,
            graph: <CausalModel nodeOnClick={this.nodeOnClick} graph={data}/>
        });
    };

    Refresh = async () => {
        const data = await service.queryGraph();//#frank,
        message.info("Refresh");

        this.setState({
            node: [] as { title: string }[],
            nodeNames: [] as string[],//title: 'Ant Design Title 1'
            groupName: "" as string,
            graphData: data,
            graph: <CausalModel nodeOnClick={this.nodeOnClick} graph={data}/>
        });
    };

    InputOnChange = (event: any) => {
        this.setState({...this.state, groupName: event.target.value})
    };

    render() {
        return (

            <div style={{padding: 15}}>
                <PageHeader
                    style={{
                        border: '1px solid rgb(235, 237, 240)',
                    }}
                    title="Process Mining"
                    subTitle="Pads Group"
                />
                <Row gutter={24} type={"flex"}>
                    <Col id={"graph"} xl={20} lg={20} md={24} sm={24} xs={24}>
                        <div style={{padding: 10}}>
                            {this.state.graph}
                        </div>
                    </Col>
                    <Col id={"name"} xl={4} lg={4} md={24} sm={24} xs={24}>
                        <div style={{padding: 10}}>

                            <div style={{padding: 10}}>
                                <Button onClick={this.Refresh} style={{marginRight: 10}}>Refresh</Button>
                                <Button onClick={this.Send} style={{marginRight: 10}}>Send</Button>
                                <Button onClick={this.Clean}>Clean</Button>
                            </div>

                            <div style={{padding: 10}}>
                                <Input placeholder="Group Name" allowClear={true} value={this.state.groupName} onChange={this.InputOnChange}/>
                            </div>

                            <div style={{padding: 10}}>
                                {this.state.node.map((item) => {
                                        return <div key={item.title}><p>{item.title}</p></div>
                                    }
                                )}
                            </div>
                        </div>

                    </Col>
                </Row>
            </div>
        );
    }
}

export default Page;
