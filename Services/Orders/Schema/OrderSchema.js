const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    Buyer: {
        _id: mongoose.Types.ObjectId,
        Fullname: String,
        Email: String 
    },
    Products: [], // { _id, Name, Price, Image }
    TotalPrice: Number,
    Status: String,
    DateOfDelivery: Date
});

module.exports = mongoose.model('Order', OrderSchema);