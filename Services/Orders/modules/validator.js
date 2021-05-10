let axios = require('axios');
require('dotenv').config();

/*
* @param {string} jwt Token used for athentication
*/
const ValidateJwt = async (jwt) => {
    let err, response = await axios.post(process.env.AuthService + '/auth', null, { headers: { jwt: jwt } });
    if(err) return null;
    return response.data;
}

module.exports = { ValidateJwt: ValidateJwt }