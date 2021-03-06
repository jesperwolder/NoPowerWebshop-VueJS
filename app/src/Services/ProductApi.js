let axios = require('axios');
const server1 = "http://176.20.223.225:3001"

///------- Products --------
const GetAllProductsURL = server1 + '/all/';
const GetSingleProductURL = server1 + '/product/';

///------- Admin controll --------
const CreateProductURL = server1 + '/admin/create';
const UpdateProductURL = server1 + '/admin/update';
const ChangeProductStatusURL = server1 + '/admin/changeProductStatus/';


//------------------products------------------

export const GetAllProductsBody = async( limit = 0, page = 0 ) =>{
    let err, response = await axios.get( GetAllProductsURL + limit + '/' + page );

    if(err) throw err;

    return response.data;

}

export const GetProductBody = async( id ) => {
    let err, response = await axios.get(GetSingleProductURL + id);

    if( err ) throw err;

    return response.data;
}

//------------------Admin routes-------------------
export const CreateProductBody = async(body, jwt) =>{    
    let err, response = await axios.post(CreateProductURL, body, {headers: {jwt: jwt}})

    if(err) throw err;

    return response.data;
}

export const UpdateProductBody = async(body, jwt) => {
    let err, response = await axios.post(UpdateProductURL, body, {headers: {jwt: jwt}})

    if(err) throw err;

    return response.data;
}

export const ChangeProductStatus = async(id, status, jwt) =>{
    let err, response = await axios.post(ChangeProductStatusURL + id + '/' + status, {headers: {jwt: jwt}})

    if(err) throw err;

    return response.data;
}
