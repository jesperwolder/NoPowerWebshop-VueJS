const express = require('express');
const User = require('../Schema/UserInfo');
const auth = require('../modules/authentication');

const router = express.Router();

router.get('/', async (req, res) => {
    if(!req.headers.jwt) {
        res.status(403).json({
            message: "Ikke autoriseret",
            users: null
        });
        return;
    }
    
    let jwt = auth.VerifyJwt(req.headers.jwt);
    if(!jwt) {
        res.status(403).json({
            message: "Ikke autoriseret",
            users: null
        });
        return;
    }
    
    let err2, user = await User.findOne( { _id: jwt.id } );
    console.log(user);
    if(err2 || !user || !user.isAdmin) {
        res.status(403).json({
            message: "Ikke autoriseret",
            users: null
        });
        return;
    }
    
    let err3, users = await User.find({});
    if(err3 || !users || users.length == 0) {
        res.status().json({
            message: 'Der skete en ukendt fejl prøv igen senere, eller kontakt en system admin',
            users: null
        });
        return;
    }

    res.json({
        message: 'success',
        users: users
    });
});

module.exports = router;