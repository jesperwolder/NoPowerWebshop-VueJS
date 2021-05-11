const express = require('express');
const User = require('../Schema/UserInfo');
const auth = require('../modules/authentication');

const router = express.Router();

router.get('/', async (req, res) => {
    if(!req.headers.jwt) {
        res.status(403).json({
            Message: "Ikke autoriseret",
            User: null
        });
        return;
    }
    
    let jwt = auth.VerifyJwt(req.headers.jwt);
    if(!jwt) {
        res.status(403).json({
            Message: "Ikke autoriseret",
            User: null
        });
        return;
    }
    
    let err2, user = await User.findOne( { _id: jwt.id } );
    if(err2 || !user || !user.isAdmin) {
        res.status(403).json({
            Message: "Ikke autoriseret",
            User: null
        });
        return;
    }
    
    console.log('/all -> ' + user.Email);

    let err3, users = await User.find({});
    if(err3 || !users || users.length == 0) {
        res.status().json({
            Message: 'Der skete en ukendt fejl prøv igen senere, eller kontakt en system admin',
            User: null
        });
        return;
    }

    res.json({
        Message: 'success',
        Users: users
    });
});

module.exports = router;