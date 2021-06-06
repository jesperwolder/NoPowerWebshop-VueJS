const Repository = require('../Repository/Order');

const Fetcher = require('../modules/Fetcher')

/**
 * @param {string} jwt
 * @param {string} OrderID 
 * @returns orders
 */
const Execute = async (jwt) => {
    let user = await Fetcher.FetchUser(jwt);
    let orders = await Repository.GetOrdersByUserID(user._id);

    return orders;
}

module.exports = { Execute: Execute }