let axios = require('axios');
require('dotenv').config();

/* 
*   @param {string} ID id of the product
*/
const GetProductByID = async (ID) => {
    let err, response = await axios.get(process.env.ProductService + '/product/' + ID);
    if(err) return null;
    return response.data.Product;
}

module.exports = { GetProductByID: GetProductByID }