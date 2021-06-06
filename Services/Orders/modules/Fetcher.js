let axios = require('axios');
require('dotenv').config();

/**
*   @param {string} ID id of the product
*/
const GetProductByID = async (ID) => {
    let err, response = await axios.get(process.env.ProductService + '/product/' + ID);
    if(err) throw { msg: "Der skete en teknisk fejl prøv igen senere", code: 503 };
    return response.data.Products;
}

/**
*   @param {string} jwt token used for authentication
*   @returns {object} object check github docs for more information
*/
const FetchUser = async (jwt) => {
    let err, response = await axios.post(process.env.AuthService + '/auth', null, { headers: { jwt: jwt } });
    if(err) throw { msg: "Der skete en teknisk fejl prøv igen senere", code: 503 };
    return response.data.User;
}

const UpdateProduct = async (product) => {
    let body = { Product: product }
    let options = { headers: { jwt: process.env.JWT } }

    let err, response = await axios.post(process.env.ProductService + '/admin/update', body, options);
    
    if(err) { 
        console.log('stock failed on ' + product.Name + " with id " + product._id);
        throw { msg: 'Der skete en transactions fejl', code: 404 } 
    }

    return response.data.Product;
}

module.exports = { 
    GetProductByID: GetProductByID, 
    FetchUser, FetchUser,
    UpdateProduct: UpdateProduct
}