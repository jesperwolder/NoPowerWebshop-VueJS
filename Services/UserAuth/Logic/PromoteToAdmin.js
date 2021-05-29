const User = require('../Schema/UserInfo');
const auth = require('../modules/authentication');

const Repository = require('../Repository/User');

/**
 * 
 * @param {string} UserID 
 * @param {string} Jwt 
 * @param {boolean} status 
 * 
 * @returns {User} user
 */
const Execute = async (UserID, Jwt, status) => {
    console.log(status);
    if(!Jwt) throw { msg: 'Ingen jwt var givet', code: 403 };
    if(status == null) throw { msg: 'Der var ikke givet nogen status', code: 403 };
    if(!UserID) throw { msg: 'Der var ikke sendt noget bruger id', code: 400 };

    let jwt = auth.VerifyJwt(Jwt);
    if(!jwt) throw { msg: 'Ikke autoriseret', code: 403 };

    let usr = await Repository.GetUserById(jwt._id);
    if(!usr.isAdmin) throw { msg: 'Ikke autoriseret', code: 403 };

    let user = await Repository.GetUserById(UserID);

    user.isAdmin = status;

    Repository.SaveUser(user);

    return user;
}

module.exports = { Execute: Execute }