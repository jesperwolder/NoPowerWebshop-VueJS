const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    Email: String,
    Fullname: String,
    Password: String,
    Phone: String,
    Address: {
        Street: String,
        Number: String,
        Zip: Number,
        City: String
    },
    isAdmin: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', UserSchema);