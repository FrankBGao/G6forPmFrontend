import request from './request';

import {message} from "antd";

const serverAddress = "http://localhost:5000";

// eslint-disable-next-line
const queryNodes = async (inputIs: any) => {
    const data = await request.get(serverAddress+'/server/api/testing', {
        params: {
            inputIs: inputIs
        }
    });
    //console.log(data);
    console.log(data);
    return new Promise(resolve =>
        resolve(data),
    );
};

export default {queryNodes}