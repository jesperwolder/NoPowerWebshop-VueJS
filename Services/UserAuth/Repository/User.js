let User = require('../Schema/UserInfo');
let mongoose = require('mongoose');

/**
 * @param {string} ID 
 * @returns {object}
 */
const GetUserById = async (ID) => {
    let err, user = await User.findById(ID);

    if(err || !user) throw { msg: 'Ingen bruger fundet', code: 403 };
    return user;
}

/**
 * @returns {object}
 */
const GetAllUsers = async () => {
    let err, users = await User.find({});

    if(err || !users) throw 'Der skete en teknisk fejl prøv igen senere';
    return users
}

/**
 * 
 * @param {string} email 
 * @returns {object}
 */
const GetUserByEmail = async (email) => {
    let err, user = await User.findOne({ Email: email });
    
    if(err || !user) throw 'Der blev ikke fundet nogen bruger';
    return user;
}

/**
 * 
 * @param {string} email 
 * @param {string} fullname 
 * @param {string} password 
 * @param {string} phone 
 * @param {string} street 
 * @param {string} number 
 * @param {number} zip 
 * @param {string} city 
 */
const CreateUser = (email, fullname, password, phone, street, number, zip, city) => {
    let user = new User();

    user._id = mongoose.Types.ObjectId();
    user.Email = email;
    user.Fullname = fullname;
    user.Password = password;
    user.Phone = phone;
    user.Address.Street = street;
    user.Address.Number = number;
    user.Address.Zip = zip;
    user.Address.City = city;

    SaveUser(user);
    return user;
}

/**
 * 
 * @param {User} user 
 */
const SaveUser = (user) => {
    user.save();
}

module.exports = { 
    GetUserById: GetUserById,
    GetAllUsers: GetAllUsers,
    GetUserByEmail: GetUserByEmail,
    SaveUser: SaveUser,
    CreateUser: CreateUser
};