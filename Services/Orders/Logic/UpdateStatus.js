let Fetcher = require('../modules/Fetcher');
let Orders = require('../Schema/OrderSchema');

const Repository = require('../Repository/Order');

/**
 * 
 * @param {string} jwt 
 * @param {string} orderID 
 * @param {string} status 
 */
const Execute = async (jwt, orderID, status) => {
    let user = await Fetcher.FetchUser(jwt);
    if(!user.isAdmin) throw { msg: 'Ikke autoriseret', code: 403 };

    let order = await Repository.GetOrderByID(orderID);
    order.Status = status;

    Repository.SaveChanges(order);

    return order;
}

module.exports = { Execute: Execute }