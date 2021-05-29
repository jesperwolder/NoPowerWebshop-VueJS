const auth = require('../modules/authentication.js');
const User = require('../Schema/UserInfo.js');

const Repository = require('../Repository/User');

let Execute = async (jwt) => {
    let authObj = auth.VerifyJwt(jwt);
    if(!authObj) throw { msg: 'Ikke autoriseret', code: 403 };

    let err, user = await Repository.GetUserById(authObj._id);
    if(err) throw { msg: 'Der blev ikke fundet nogen bruger', code: 404 };

    return user;
}


module.exports = { Execute: Execute }