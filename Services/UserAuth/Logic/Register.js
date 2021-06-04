const { response } = require('express');
const auth = require('../modules/authentication.js');

const Repository = require('../Repository/User');

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
 * 
 * @returns {objecy} { jwt, user }
 */
const Execute = async (email, fullname, password, phone, street, number, zip, city) => {
    if( 
        !email || 
        !fullname || 
        !password || 
        !phone || 
        !street || 
        !number || 
        !zip || 
        !city 
    ) throw { msg: 'Manglende værdier', code: 420 };

    email = email.toLowerCase();

    try {
        let usr = await Repository.GetUserByEmail(email);
        if(usr) throw { msg: 'Email allerede i brug', code: 409 };
    }catch(e) {
        console.log(e);
        if(e.hasOwnProperty('code')) throw e;
    }

    let hash = await auth.HashString(password);

    let user = Repository.CreateUser(email, fullname, hash, phone, street, number, zip, city);

    let jwt = auth.SignJwt({ _id: user._id, Email: user.Email });

    return { jwt: jwt, user: user };
}

module.exports = { Execute: Execute };