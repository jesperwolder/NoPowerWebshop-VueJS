const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    Products: [], // Contains { _id, Name, Price  } 
    User: {
        _id: mongoose.Types.ObjectId,
        Fullname: String,
        email: String
    },
    status: String,
    TotalPrice: Number
});

module.exports = mongoose.model('Order', OrderSchema);