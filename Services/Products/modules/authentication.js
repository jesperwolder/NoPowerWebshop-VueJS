const jwt = require('jsonwebtoken');
require('dotenv').config();
const saltrounds = 2;

let GetSalt = async () => {
    let err, salt = await bcrypt.genSalt(saltrounds);
    if(err) return null;
    return salt;
}

let SignJwt = (store) => {
    return jwt.sign(store, process.env.SECRET);
}

let VerifyJwt = (token) => {
    try {
        return jwt.verify(token, process.env.SECRET);
    }catch {
        return null;
    }
    
}

module.exports = {
    SignJwt: SignJwt, 
    VerifyJwt: VerifyJwt 
};