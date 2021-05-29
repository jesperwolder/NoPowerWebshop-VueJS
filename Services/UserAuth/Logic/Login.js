const auth = require('../modules/authentication.js')
const Repository = require('../Repository/User');

/**
 * 
 * @param {string} email 
 * @param {string} password 
 * 
 * @returns {object} { jwt, user }
 */
const Execute = async (email, password) => {
    if(!email || !password) throw { msg: 'Manglende værdier', code: 400 };

    let user = await Repository.GetUserByEmail(email);

    console.log(user);
    console.log(password);
    if(!(await auth.Compare(password, user.Password))) throw { msg: 'Email eller password var forkert',  code: 403 };

    let jwt = auth.SignJwt({ _id: user._id, Email: email });

    return { jwt: jwt, user: user }
}

module.exports = { Execute: Execute }