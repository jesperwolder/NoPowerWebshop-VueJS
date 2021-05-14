let axios = require('axios');
const server1 = "http://server.topper144p.com:3002"

///------- Order --------
const CreateRouteURL = server2 + '/create';
const GetUserOrdersRouteURL = server2 + '/GetUserOrdersRoute';
const GetSingleOrderURL = server2 + '/GetSingleOrder';

///------- Admin controll --------
const GetAllOrdersURL = server2 + '/admin/all';
const StatusRouteURL = server2 + '/admin/statuses';
const UpdateStatusRouteURL = server2 + '/admin/updateStatus';
const GetAnyOrderRouteURL = server2 + '/admin/order';

//Order Routes
export const CreateRouteBody = async(body, jwt) =>{
    let err, response = await axios.post(CreateRouteURL, body, {headers: {jwt: jwt}});

    if(err) throw err;

    return response.data;

}

export const GetUserOrdersRouteBody = async(jwt) =>{
    let err, response = await axios.get(GetUserOrdersRouteURL, {headers: {jwt: jwt}});

    if(err) throw err;

    return response.data;
}

export const GetsingleOrderBody = async(jwt) =>{
    let err, response = await axios.get(GetSingleOrderURL, {headers: {jwt: jwt}});

    if(err) throw err;

    return response.data;
}

//Admin Routes
export const GetAllOrderBody = async(jwt) =>{
    let err, response = await axios.get(GetAllOrdersURL, {headers: {jwt: jwt}});

    if(err) throw err;

    return response.data;
}

export const StatusRouteBody = async(jwt) =>{
    let err, response = await axios.get(StatusRouteURL, {headers: {jwt: jwt}});

    if(err) throw err;

    return response.data;
}

export const UpdateStatusRouteBody = async(body, jwt) =>{
    let err, response = await axios.get(UpdateStatusRouteURL, body, {headers: {jwt: jwt}});

    if(err) throw err;

    return response.data;
}

export const GetAnyOrderRouteBody = async(jwt) =>{
    let err, response = await axios.get(GetAnyOrderRouteURL, {headers: {jwt: jwt}});

    if(err) throw err;

    return response.data;
}