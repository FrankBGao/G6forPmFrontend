import request from './request';

// This is the interface with the backend server
// frontend page use html request to interact with the backend
// Normally, we use GET and POST requests.
// The GET is for sending the no encryption and small amount of data
// For other type of data, we should use POST.

// import {message} from "antd";
// import {import_data} from '../ModelAnalysis/ModelGraph/data'; // this is a testing data

const serverAddress = "/server/api";

// eslint-disable-next-line
const queryNodes = async (groupName: string, activities:any[]) => {
    const data = await request(serverAddress +'/group', {
        method: 'POST',
        data: {
            groupName: groupName,
            activities:activities,
        },
    });
    //console.log(data);
    console.log(data);
    return new Promise(resolve =>
        resolve(data),
    );
};


const queryGraph = async () => {
    const data = await request.get(serverAddress+'/gain_graph');
    //const data = import_data;
    //console.log(data);
    return new Promise(resolve =>
        resolve(data),
    );
};


const queryFile = async () => {
    const data = await request.get(serverAddress+'/download');
    //const data = import_data;
    //console.log(data);
    return new Promise(resolve =>
        resolve(data),
    );
};


export default {queryGraph, queryNodes, queryFile}