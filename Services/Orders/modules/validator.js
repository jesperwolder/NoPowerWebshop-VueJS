import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

/**
*   @param {string} jwt token used for authentication
*/
const ValidateJwt = async (jwt) => {
    let err, response = await axios.post(process.env.UserService + '/auth', null, { headers: { jwt: jwt } });
    if(err) return null;
    return response.data;
}

module.exports = { ValidateJwt: ValidateJwt }