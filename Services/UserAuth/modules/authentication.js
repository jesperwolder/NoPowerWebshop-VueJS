const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const saltrounds = 2;

let GetSalt = async () => {
    let err, salt = await bcrypt.genSalt(saltrounds);
    if(err) throw 'kunne ikke generere salt';
    return salt;
}

/**
 * 
 * @param {string} str 
 * @returns {string}
 */
let HashString = async (str) => {
    let salt = await GetSalt();

    let errHash, hash = await bcrypt.hash(str, salt);
    if(errHash) throw 'Kunne ikke Hashe string';
    return hash;
}

/**
 * 
 * @param {string} plain 
 * @param {string} hash 
 * @returns 
 */
let Compare = async (plain, hash) => {
    return await bcrypt.compare(plain, hash);
}

/**
 * 
 * @param {any} store { _id, Email }
 * @returns 
 */
let SignJwt = (store) => {
    return jwt.sign(store, process.env.SECRET);
}

/**
 * 
 * @param {string} token 
 * @returns {string} jwt
 */
let VerifyJwt = (token) => {
    return jwt.verify(token, process.env.SECRET);
}

module.exports = { 
    HashString: HashString, 
    Compare: Compare, 
    SignJwt: SignJwt, 
    VerifyJwt: VerifyJwt 
};