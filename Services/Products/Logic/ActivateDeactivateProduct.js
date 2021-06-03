const Repository = require('../Repository/Product');
const Fetcher = require('../modules/Fetcher');

/**
 * 
 * @param {string} jwt 
 * @param {string} productID 
 * @param {boolean} status 
 */
const Execute = async (jwt, productID, status) => {
    let user = await Fetcher.FetchUser(jwt);
    if(!user.isAdmin) throw { msg: 'Ikke autoriseret', code: 403 };

    let product = await Repository.GetProductById(productID);
    product.isActive = status;

    Repository.SaveProduct(product);
    return product;
}

module.exports = { Execute: Execute }