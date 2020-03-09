/* tslint:disable */
import React from 'react';
import CausalModel from "./ModelAnalysis"
import {Row, Col, Divider, Button, message, PageHeader, Input, Modal, Upload, Icon, Select} from "antd";
import "antd/dist/antd.css";
import service from "./service/index"

const {Option} = Select;

// This page is for the UI, this is not complex project, thus, we put everything in this file.
// If you need build a more complicate UI, you better separate the div doms into several file.


class Page extends React.Component {
    // initial the global variables
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
    // the functions for controlling the components (buttons, graph, and input)
    nodeOnClick = (model: any) => {
        // Here is a little complex, the business here has two points
        // 1,node click, its name will be put into the list
        // 2, if the node already in the list, it will be removed form the list
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

    //clean the list of node which has be selected
    Clean = () => {
        this.setState({
            ...this.state,
            node: [] as { title: string }[],
            nodeNames: [] as string[],//title: 'Ant Design Title 1'
        });
    };
    // send a list of node's name back to the server.
    Send = async () => {
        message.info({content: "Sent to the server, calculating", key: "calculating", duration: 10000});
        // here is the contact with the backend server
        const data = await service.queryNodes(this.state.groupName, this.state.nodeNames);//#frank,
        this.setState({
            ...this.state,
            graphData: "",
            graph: ""
        });
        // here is update the graph, create a new node of the graph to replace the old one
        const new_node = <CausalModel nodeOnClick={this.nodeOnClick} graph={data}/>;
        // reset the global variable
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
    // the original graph could be generated here, without upload any event log file
    Refresh = async () => {
        // here is the contact with the backend server
        const data = await service.queryGraph();//#frank,
        message.info("Refresh");
        this.setState({
            ...this.state,
            graphData: "",
            graph: ""
        });
        // here is update the graph, create a new node of the graph to replace the old one
        const new_node = <CausalModel nodeOnClick={this.nodeOnClick} graph={data}/>;
        // reset the global variable
        this.setState({
            ...this.state,
            node: [] as { title: string }[],
            nodeNames: [] as string[],//title: 'Ant Design Title 1'
            groupName: "" as string,
            graphData: data,
            graph: new_node
        });
    };

    //when the input box's value has been changed, this function will be called,
    // the value of the input box will be in the event, which is the input of this function
    InputOnChange = (event: any) => {
        this.setState({...this.state, groupName: event.target.value})
    };

    //upload, pop out the modal to allow user to upload a new event log
    showModal = () => {
        this.setState({...this.state, visible: true})
    };
    //the modal ok button, contact with the backend gain data, and refresh the graph
    ModalOnOk = async () => {
        // here is the contact with the backend server
        const data = await service.queryGraph();//#frank,
        message.info("Refresh");

        this.setState({
            ...this.state,
            graphData: "",
            graph: ""
        });
        // here is update the graph, create a new node of the graph to replace the old one
        const new_node = <CausalModel nodeOnClick={this.nodeOnClick} graph={data}/>;
        // reset the global variable
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

    //download///////////////////////////////////////////////////////
    // this function is for selecting the DFG or the event log to download
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
        // TODO,
        // here has a problem, here the browser blocks the download requirement, I don't know why,
        // the user should the refresh(press the enter on the keyboard) on the pop out tag, then, the file will download
        const oa = document.createElement('a');
        oa.href = `localhost:5000/server/api/download/${this.state.FileType}`;
        oa.setAttribute('target', '_blank');
        document.body.appendChild(oa);
        oa.click();
        //await service.queryFile()
    };


    render() {
        const serverAddress = "/server/api";
        //Here is for posting the event log to backend.
        const props = {
            name: 'file',
            action: serverAddress + "/upload",
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info: any) {
                // Here is the callback from the backend.
                if (info.file.status !== 'uploading') {
                    //console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    // showing the status for the user
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        // Here is the web-page
        return (

            <div style={{padding: 15}}>
                <PageHeader
                    style={{
                        border: '1px solid rgb(235, 237, 240)',
                    }}
                    title="Process Mining"
                    subTitle="Pads Group"
                />
                {/*Here is the Row and Col layout, it could auto-calculate the width, and it could auto-fit with the window
                but it is no effect on the dom's height*/}
                <Row gutter={24} type={"flex"}>
                    {/*graph will be visualized at this column, if the screen */}
                    <Col id={"graph"} xl={20} lg={20} md={24} sm={24} xs={24}>
                        <div style={{padding: 10}}>
                            {this.state.graph}
                        </div>
                    </Col>
                    {/*The interaction is in this column, these elements are allow user to send node's name back to server,
                    and then do more calculation*/}
                    <Col id={"name"} xl={4} lg={4} md={24} sm={24} xs={24}>
                        <div style={{padding: 10}}>
                            <div style={{padding: 10}}>
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
                            {/*after click a node in the graph, here will create a new dom for the node*/}
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
                    {/*here is the pop out modal, in the beginning, this modal is invisible, after click the button,
                     the variable of visible will be changed into True, then the user could see the modal*/}
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
                    {/*Here is another modal for downloading the created event log*/}
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
