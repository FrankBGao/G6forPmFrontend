import request from './request';

import {message} from "antd";
import {import_data} from '../ModelAnalysis/ModelGraph/data';

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


export default {queryGraph, queryNodes}