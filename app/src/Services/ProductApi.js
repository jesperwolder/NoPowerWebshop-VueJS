let axios = require('axios');
const server1 = "http://server.topper144p.com:3001"
const GetAllProductsURL = server1 + '/all';
const CreateProductURL = server1 + '/admin/create';
const UpdateProductURL = server1 + '/admin/update';
const ChangeProductStatusURL = server1 + '/admin/changeProductStatus';

//products

export const GetAllProductsBody = async(jwt) =>{
    let err, response = await axios.get(GetAllProductsURL, {headers: {jwt: jwt }});

    if(err) throw err;

    return response.data;

}

export const CreateProductBody = async(body, options, jwt) =>{
    let err, reponse = await axios.post(CreateProductURL, body, options, {headers: {jwt: jwt}})

    if(err) throw err;

    return response.data;
}

export const UpdateProductBody = async(body, options, jwt) =>{
    let err, reponse = await axios.post(UpdateProductURL, body, options, {headers: {jwt: jwt}})

    if(err) throw err;

    return reponse.data;
}

export const ChangeProductStatus = async(jwt) =>{
    let err, reponse = await axios.post(ChangeProductStatusURL, {headers: {jwt: jwt}})

    if(err) throw err;

    return reponse.data;
}
