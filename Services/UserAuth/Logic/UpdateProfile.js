const auth = require('../modules/authentication.js');

const Repository = require('../Repository/User');

/**
 * 
 * @param {string} Jwt
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
const Execute = async (Jwt, email, fullname, phone, street, number, zip, city) => {
    let obj = auth.VerifyJwt(Jwt);

    let user = await Repository.GetUserById(obj._id);
    console.log(user);

    user.Email = (email ? email : user.Email);
    user.Fullname = (fullname ? fullname : user.Fullname);
    user.Phone = (phone ? phone : user.Phone);
    user.Address.Street = (street ? street : user.Address.Street);
    user.Address.Zip = (zip ? zip : user.Address.Zip);
    user.Address.Number = (number ? number : user.Address.Number);
    user.Address.City = (city ? city : user.Address.City);

    Repository.SaveUser(user);

    return user;
}

module.exports = { Execute: Execute }
