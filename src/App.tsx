import React, {useState} from 'react';
import CausalModel from "./ModelAnalysis"
import {Row, Col, Card, Button, message, PageHeader} from "antd";
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
    };

    nodeOnClick = (model: any) => {
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
        const data = await service.queryNodes(this.state.node);//#frank,
        message.info(this.state.node + "sent to the server");

        this.setState({
            node: [] as { title: string }[],
            nodeNames: [] as string[],//title: 'Ant Design Title 1'
        });
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
                            <Card>
                                <CausalModel nodeOnClick={this.nodeOnClick}/>
                            </Card>
                        </div>
                    </Col>
                    <Col id={"name"} xl={4} lg={4} md={24} sm={24} xs={24}>
                        <div style={{padding: 10}}>
                            <Button onClick={this.Send} style={{marginRight: 10}}>Send</Button>
                            <Button onClick={this.Clean}>Clean</Button>
                            {this.state.node.map((item) => {
                                    return <div key={item.title}><p>{item.title}</p></div>
                                }
                            )}
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Page;
