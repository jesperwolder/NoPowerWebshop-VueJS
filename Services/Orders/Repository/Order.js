const mongoose = require('mongoose');
const Order = require('../Schema/OrderSchema');

const GetAll = async () => {
    let err, orders = await Order.find({});
    if(err || !orders) throw { msg: 'Der blev ikke fundet nogle ordre', code: 404 };

    return orders;
}

const GetOrderByID = async (id) => {
    let err, order = await Order.findById(id);
    if(err || !order) throw { msg: 'Der blev ikke fundet nogle ordre', code: 404 };

    return order;
}

const SaveChanges = (order) => {
    order.SaveChanges();
}

module.exports = {
    GetAll: GetAll,
    GetOrderByID: GetOrderByID,
    SaveChanges: SaveChanges
}