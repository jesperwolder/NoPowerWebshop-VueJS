const { response } = require('express');
const auth = require('../modules/authentication');
const Repository = require('../Repository/User');

/**
 * 
 * @param {string} Jwt 
 */
const Execute = async (Jwt) => {
    let jwt = auth.VerifyJwt(Jwt);
    let user = await Repository.GetUserById(jwt._id);

    if(!user || !user.isAdmin) throw { msg: 'Du er ikke autoriseret til denne handling', code: 403 };

    let users = await Repository.GetAllUsers();

    return users;
}

module.exports = { Execute: Execute }