let Fetcher = require('../modules/Fetcher');
let Orders = require('../Schema/OrderSchema');

const Repository = require('../Repository/Order');

/**
 * 
 * @param {string} jwt used for authentication
 * @returns {array} array of orders
 */
const Execute = async (jwt) => {
    if(!jwt) throw { msg: 'No authentication key was given', code: 403 };
    let user = await Fetcher.FetchUser(jwt);

    if(!user.isAdmin) throw { msg: 'Unauthorized', code: 403 };
    let orders = await Repository.GetAll();

    return orders;
}

module.exports = { Execute: Execute }