const auth = require('../modules/authentication');
const User = require('../Schema/UserInfo');

const Repository = require('../Repository/User');

/**
 * 
 * @param {string} Jwt 
 * @param {string} UserID 
 * @param {string} email 
 * @param {string} fullname 
 * @param {string} phone 
 * @param {string} street 
 * @param {string} number 
 * @param {number} zip 
 * @param {string} city 
 * 
 * @returns {User} user
 */
const Execute = async (Jwt, UserID, email, fullname, phone, street, number, zip, city) => {
    let jwt = auth.VerifyJwt(Jwt);

    let admin = await Repository.GetUserById(jwt._id);
    if(!admin.isAdmin) throw { msg: 'Ikke autoriseret', code: 403 };

    let user = await Repository.GetUserById(UserID);
    console.log(user);

    user.Email = (email ? email : user.Email);
    user.Fullname = (fullname ? fullname : user.Fullname);
    user.Phone = (phone ? phone : user.Phone);
    user.Address.Street = (street ? street : user.Address.Street);
    user.Address.Zip = (zip ? zip : user.Address.Zip);
    user.Address.Number = (number ? number : user.Adress.Number);
    user.Address.City = (city ? city : user.Address.City);

    Repository.SaveUser(user);

    return user;
}

module.exports = { Execute: Execute }