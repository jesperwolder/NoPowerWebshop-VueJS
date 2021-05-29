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
const ValidateJwt = async (jwt) => {
    let err, response = await axios.post(process.env.AuthService + '/auth', null, { headers: { jwt: jwt } });
    if(err) throw { msg: "Der skete en teknisk fejl prøv igen senere", code: 503 };
    return response.data;
}

module.exports = { GetProductByID: GetProductByID, ValidateJwt, ValidateJwt }