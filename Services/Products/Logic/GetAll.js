const Fetcher = require('../modules/Fetcher');
const Repository = require('../Repository/Product');

/**
 * 
 * @param {string} jwt 
 * @param {number} Limit 
 * @param {number} page 
 * @returns 
 */
const Execute = async (jwt, Limit, page) => {
    let isAdmin = false;
    if(jwt) {
        let user = await Fetcher.FetchUser(jwt);
        let isAdmin = user.isAdmin;
    }

    let limit = 100;
    if(Limit > 0) limit = Limit;

    let offset = 0;
    if(page > 0) offset = limit * page;

    let products;
    if(!isAdmin) {
        products = await Repository.GetProductsFromParam({ isActive: true }, offset, limit);
    }else {
        products = await Repository.GetProductsFromParam({}, offset, limit);
    }

    return products;
}

module.exports = { Execute: Execute }