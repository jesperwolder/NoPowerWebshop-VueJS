const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    Products: [], // { _id, Name, Price, SalePercentage, Tumbnail, Quantity }
    Billing: {
        UserID: mongoose.Types.ObjectId,
        Fullname: String,
        Email: String,
        Phone: String,
        Address: String
    },
    TotalPrice: Number,
    Status: String,
    DateOfDelivery: Date
});

module.exports = mongoose.model('Order', OrderSchema);