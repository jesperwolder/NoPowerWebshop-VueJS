const mongoose = require('mongoose');
const Order = require('../Schema/OrderSchema');

/**
 * 
 * @param {array} products 
 * @param {string} userID 
 * @param {string} fullname 
 * @param {string} email 
 * @param {string} phone 
 * @param {string} address 
 */
const CreateOrder = async (products, userID, fullname, email, phone, address, date) => {
    let order = new Order();
    order._id = mongoose.Types.ObjectId();
    order.Products = products;
    order.Billing.UserID = userID;
    order.Billing.Fullname = fullname;
    order.Billing.Email = email;
    order.Billing.Phone = phone;
    order.Billing.Address = address;
    order.DateOfDelivery = date;
    order.Status = "Under håndtering";

    SaveChanges(order);

    return order;
}

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

const GetOrdersByUserID = async (UserID) => {
    let err, orders = await Order.find({ "Billing.UserID": UserID });
    if(err || !orders) throw { msg: 'Der blev ikke fundet nogle ordre', code: 404 };

    return orders;
}

const SaveChanges = (order) => {
    order.save();
}

module.exports = {
    GetAll: GetAll,
    GetOrderByID: GetOrderByID,
    GetOrdersByUserID: GetOrdersByUserID,
    SaveChanges: SaveChanges,
    CreateOrder: CreateOrder
}