const axios = require('axios');

require('dotenv').config();

/**
*   @param {string} jwt token used for authentication
*   @returns {object} object check github docs for more information
*/
const ValidateJwt = async (jwt) => {
    let err, response = await axios.post(process.env.AuthService + '/auth', null, { headers: { jwt: jwt } });
    if(err) return null;
    return response.data;
}

module.exports = { ValidateJwt: ValidateJwt }