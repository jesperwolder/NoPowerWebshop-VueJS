let axios = require('axios');
const server2 = "http://176.20.223.225:3002"

///------- Order --------
const CreateOrderURL = server2 + '/create';
const GetUserOrdersURL = server2 + '/orders';
const GetSingleOrderURL = server2 + '/order/';

///------- Admin controll --------
const GetAllOrdersURL = server2 + '/admin/all';
const OrderStatusURL = server2 + '/admin/statuses';
const UpdateOrderStatusURL = server2 + '/admin/updateStatus';
const GetAnyOrderURL = server2 + '/admin/order';

//------------------Order Routes-------------------
export const CreateOrderBody = async(body, jwt) =>{
    let err, response = await axios.post(CreateOrderURL, body, {headers: {jwt: jwt}});

    if(err) throw err;

    return response.data;

}

export const GetUserOrdersBody = async(jwt) =>{
    let err, response = await axios.get(GetUserOrdersURL, {headers: {jwt: jwt}});

    if(err) throw err;

    return response.data;
}

export const GetSingleOrderBody = async(id) =>{
    let err, response = await axios.get(GetSingleOrderURL + id);

    if(err) throw err;

    return response.data;
}

//------------------Admin routes-------------------
export const GetAllOrdersBody = async(jwt) =>{
    let err, response = await axios.get(GetAllOrdersURL, {headers: {jwt: jwt}});

    if(err) throw err;

    return response.data;
}

export const OrderStatusBody = async(jwt) =>{
    let err, response = await axios.get(OrderStatusURL, {headers: {jwt: jwt}});

    if(err) throw err;

    return response.data;
}

export const UpdateOrderStatusBody = async(body, jwt) =>{
    let err, response = await axios.post(UpdateOrderStatusURL, body, {headers: {jwt: jwt}});

    if(err) throw err;

    return response.data;
}

export const GetAnyOrderBody = async(jwt) =>{
    let err, response = await axios.get(GetAnyOrderURL, {headers: {jwt: jwt}});

    if(err) throw err;

    return response.data;
}