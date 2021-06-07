const mongoose = require('mongoose');

const NowPlus5Days = () => {
    var result = new Date();
    result.setDate(result.getDate() + 5);
    return new Date(result);
}

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
    DateOfDelivery: { Type: Date, Default: NowPlus5Days() }
});

module.exports = mongoose.model('Order', OrderSchema);