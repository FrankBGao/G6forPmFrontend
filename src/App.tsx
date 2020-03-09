/* tslint:disable */
import React from 'react';
import CausalModel from "./ModelAnalysis"
import {Row, Col, Divider, Button, message, PageHeader, Input, Modal, Upload, Icon, Select} from "antd";
import "antd/dist/antd.css";
import service from "./service/index"

const {Option} = Select;

// const Page: React.FC = props => {
class Page extends React.Component {

    state = {
        node: [] as { title: string }[],
        nodeNames: [] as string[],
        groupName: "" as string,
        graphData: {} as any,
        graph: "" as any,
        visible: false,
        downVisible: false,
        FileType: "DFG",
    };

    nodeOnClick = (model: any) => {
        if (this.state.nodeNames.indexOf(model.name) != -1) {
            if (this.state.nodeNames.length === 1) {
                this.setState({
                    ...this.state,
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
                    ...this.state,
                    node: node,
                    nodeNames: nodeNames,
                });
            }
            return
        } else {
            this.setState({
                ...this.state,
                node: this.state.node.concat([{title: model.name}]),
                nodeNames: this.state.nodeNames.concat([model.name]),
            });
        }

    };


    Clean = () => {
        this.setState({
            ...this.state,
            node: [] as { title: string }[],
            nodeNames: [] as string[],//title: 'Ant Design Title 1'
        });
    };

    Send = async () => {
        message.info({content: "Sent to the server, calculating", key: "calculating", duration: 10000});
        const data = await service.queryNodes(this.state.groupName, this.state.nodeNames);//#frank,
        this.setState({
            ...this.state,
            graphData: "",
            graph: ""
        });
        const new_node = <CausalModel nodeOnClick={this.nodeOnClick} graph={data}/>;
        this.setState({
            ...this.state,
            node: [] as { title: string }[],
            nodeNames: [] as string[],//title: 'Ant Design Title 1'
            groupName: "" as string,
            graphData: data,
            graph: new_node
        });
        message.success({content: "calculating complete", key: "calculating"});

    };

    Refresh = async () => {
        const data = await service.queryGraph();//#frank,
        message.info("Refresh");
        this.setState({
            ...this.state,
            graphData: "",
            graph: ""
        });

        const new_node = <CausalModel nodeOnClick={this.nodeOnClick} graph={data}/>;
        this.setState({
            ...this.state,
            node: [] as { title: string }[],
            nodeNames: [] as string[],//title: 'Ant Design Title 1'
            groupName: "" as string,
            graphData: data,
            graph: new_node
        });
    };

    InputOnChange = (event: any) => {
        this.setState({...this.state, groupName: event.target.value})
    };

    //upload
    showModal = () => {
        this.setState({...this.state, visible: true})
    };
    ModalOnOk = async () => {
        const data = await service.queryGraph();//#frank,
        message.info("Refresh");

        this.setState({
            ...this.state,
            graphData: "",
            graph: ""
        });

        const new_node = <CausalModel nodeOnClick={this.nodeOnClick} graph={data}/>;

        this.setState({
            ...this.state,
            node: [] as { title: string }[],
            nodeNames: [] as string[],//title: 'Ant Design Title 1'
            groupName: "" as string,
            graphData: data,
            visible: false,
            graph: new_node
        });

        //this.setState({...this.state, visible: false})
    };
    ModalOnCancel = () => {
        this.setState({...this.state, visible: false})
    };

    //download
    changeFileType = (value: string) => {
        this.setState({...this.state, FileType: value})
    };
    showDownloadModal = () => {
        this.setState({...this.state, downVisible: true})
    };

    DownloadModalOnCancel = () => {
        this.setState({...this.state, downVisible: false})
    };

    handleDownload = () => {
        const oa = document.createElement('a');
        oa.href = `localhost:5000/server/api/download/${this.state.FileType}`;
        oa.setAttribute('target', '_blank');
        document.body.appendChild(oa);
        oa.click();
        //await service.queryFile()
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
                    //console.log(info.file, info.fileList);
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
                                {/*<Row gutter={24} type={"flex"}>*/}
                                    {/*<Col id={"Upload"} xl={12} lg={12} md={24} sm={24} xs={24}>*/}

                                    {/*</Col>*/}
                                    {/*<Col id={"Upload"} xl={12} lg={12} md={24} sm={24} xs={24}>*/}

                                    {/*</Col>*/}
                                {/*</Row>*/}
                                <Button type="primary" onClick={this.showModal} style={{marginRight: 10, marginBottom: 5}}>
                                    Upload File
                                </Button>
                                <Button type="primary" onClick={this.showDownloadModal} style={{marginRight: 10, marginBottom: 5}}>
                                    Download File
                                </Button>
                            </div>
                            <Divider/>
                            <div style={{padding: 10}}>

                                <Button onClick={this.Send} style={{marginRight: 10, marginBottom: 5}}>Send</Button>
                                <Button onClick={this.Clean} style={{marginRight: 10, marginBottom: 5}}>Clean</Button>
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


                    </Col>
                </Row>

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
                <div>
                    <Modal
                        title="Download File"
                        visible={this.state.downVisible}
                        //onOk={this.DownloadModalOnOK}
                        onCancel={this.DownloadModalOnCancel}
                        destroyOnClose={true}
                        footer={
                            <Button type="primary" onClick={this.DownloadModalOnCancel}>Cancel</Button>
                        }
                    >
                        <p>File Type</p>
                        <Select defaultValue="DFG" style={{width: 120}} onChange={this.changeFileType}>
                            <Option value="DFG">DFG</Option>
                            <Option value="NewLog">New Log</Option>
                        </Select>
                        <Button type="primary" onClick={this.handleDownload} style={{marginLeft: 10}}>
                            Download
                        </Button>
                    </Modal>
                </div>
            </div>


        );
    }
}

export default Page;
