const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    Creator: {
        _id: mongoose.Types.ObjectId,
        creatorEmail: String,
        creatorFullname: String,
    },
    Name: String,
    Description: String,
    Price: Number,
    Image: String,
    Categories: Array,
    SalePercentage: { type: Number, default: 0 },
    Stock: { type: Number, default: 0 },
    TechnicalDetails: Array, // contains objects { Header: string Items: { Name: string, Value: string } }
    isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Product', ProductSchema);