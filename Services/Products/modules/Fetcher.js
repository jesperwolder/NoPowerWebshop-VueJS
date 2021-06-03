const axios = require('axios');

require('dotenv').config();

/**
 * 
 * @param {string} jwt 
 * @returns 
 */
const FetchUser = async (jwt) => {
    let options = { headers: { jwt: jwt } }
    let err, response = await axios.post(process.env.AuthService + '/auth', null, options);
    if(err) throw { msg: 'Kunne ikke hente brugeroplysninger, prøv igen', code: 404 };

    return response.data.User;
}

module.exports = { FetchUser: FetchUser }