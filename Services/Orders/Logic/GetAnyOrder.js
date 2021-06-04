let Fetcher = require('../modules/Fetcher');
let Orders = require('../Schema/OrderSchema');

const Repository = require('../Repository/Order');

/**
 * 
 * @param {string} jwt 
 * @param {string} orderID 
 * 
 * @returns {object} returns object
 */
const Execute = async (jwt, orderID) => {
    let user = await Fetcher.FetchUser(jwt);
    if(!user.isAdmin) throw { msg: 'Ikke autoriseret', code: 403 };

    let order = Repository.GetOrderByID(orderID);

    return order;
}