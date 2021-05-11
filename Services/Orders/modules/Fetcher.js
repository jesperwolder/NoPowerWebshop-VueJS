let axios = require('axios');

/* 
*   @param {string} ID id of the product
*/
const GetProductByID = async (ID) => {
    let err, response = await axios.get(process.env.ProductService + '/product/' + ID);
    if(err) return null;
    return response.data.product;
}

module.exports = { GetProductByID: GetProductByID }