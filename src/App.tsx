import React, {useState} from 'react';
import CausalModel from "./ModelAnalysis"
import {Row, Col, Divider, Button, message, PageHeader, Input, Modal, Upload, Icon} from "antd";
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
        graph: "" as any,
        visible: false
    };

    nodeOnClick = (model: any) => {
        if (this.state.nodeNames.indexOf(model.name) != -1) {
            if (this.state.nodeNames.length === 1) {
                this.setState({
                    node: [] as { title: string }[],
                    nodeNames: [] as string[],
                });
                return
            } else {
                const index = this.state.nodeNames.indexOf(model.name);
                const node = [...this.state.node];
                const nodeNames = [...this.state.nodeNames];

                node.splice(index, 1);
                nodeNames.splice(index, 1);
                this.setState({
                    node: node,
                    nodeNames: nodeNames,
                });
            }
            return
        } else {
            this.setState({
                node: this.state.node.concat([{title: model.name}]),
                nodeNames: this.state.nodeNames.concat([model.name]),
            });
        }

    };


    Clean = () => {
        this.setState({
            node: [] as { title: string }[],
            nodeNames: [] as string[],//title: 'Ant Design Title 1'
        });
    };

    Send = async () => {
        message.info({content: "Sent to the server, calculating", key: "calculating", duration: 10000});
        const data = await service.queryNodes(this.state.groupName, this.state.nodeNames);//#frank,

        console.log(data);
        this.setState({
            ...this.state,
            node: [] as { title: string }[],
            nodeNames: [] as string[],//title: 'Ant Design Title 1'
            groupName: "" as string,
            graphData: data,
            graph: <CausalModel nodeOnClick={this.nodeOnClick} graph={data}/>
        });
        message.success({content: "calculating complete", key: "calculating"});

    };

    Refresh = async () => {
        const data = await service.queryGraph();//#frank,
        message.info("Refresh");

        this.setState({
            ...this.state,
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

    showModal = () => {
        this.setState({...this.state, visible: true})
    };
    ModalOnOk = async () => {
        const data = await service.queryGraph();//#frank,
        message.info("Refresh");

        this.setState({
            ...this.state,
            node: [] as { title: string }[],
            nodeNames: [] as string[],//title: 'Ant Design Title 1'
            groupName: "" as string,
            graphData: data,
            visible: false,
            graph: <CausalModel nodeOnClick={this.nodeOnClick} graph={data}/>
        });

        //this.setState({...this.state, visible: false})
    };
    ModalOnCancel = () => {
        this.setState({...this.state, visible: false})
    };


    render() {
        const serverAddress = "/server/api";

        const props = {
            name: 'file',
            action: serverAddress + "/upload",
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info: any) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };

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
                                <Button type="primary" onClick={this.showModal}>
                                    Upload File
                                </Button>
                            </div>
                            <Divider/>
                            <div style={{padding: 10}}>

                                <Button onClick={this.Send} style={{marginRight: 10, marginBottom: 5}}>Send</Button>
                                <Button onClick={this.Clean}>Clean</Button>
                                <Button onClick={this.Refresh}
                                        style={{marginRight: 10, marginBottom: 5}}>Refresh</Button>
                            </div>
                            <Divider/>
                            <div style={{padding: 10}}>
                                <Input placeholder="Group Name" allowClear={true} value={this.state.groupName}
                                       onChange={this.InputOnChange}/>
                            </div>
                            <Divider/>
                            <div style={{padding: 10}}>
                                {this.state.node.map((item) => {
                                        return <div key={item.title}><p>{item.title}</p> <Divider dashed={true}/></div>

                                    }
                                )}
                            </div>
                        </div>

                        <div>
                            <Modal
                                title="Upload File"
                                visible={this.state.visible}
                                onOk={this.ModalOnOk}
                                onCancel={this.ModalOnCancel}
                                destroyOnClose={true}
                            >
                                <p>XES Files</p>
                                <Upload {...props}>
                                    <Button>
                                        <Icon type="upload"/> Click to Upload
                                    </Button>
                                </Upload>
                            </Modal>
                        </div>

                    </Col>
                </Row>
            </div>
        );
    }
}

export default Page;
