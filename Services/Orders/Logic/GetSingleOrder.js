const Repository = require('../Repository/Order');

/**
 * 
 * @param {string} OrderID 
 * @returns order
 */
const Execute = async (OrderID) => {
    return order = await Repository.GetOrderByID(OrderID);
}

module.exports = { Execute: Execute }