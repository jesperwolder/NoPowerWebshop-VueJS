const express = require('express');
const User = require('../Schema/UserInfo');
const auth = require('../modules/authentication');

const router = express.Router();

router.post('/', async (req, res) => {
    if(!req.headers.jwt) {
        res.status(403).json({
            message: "Ikke autoriseret",
            users: null
        });
        return;
    }

    if(!req.body.userID) {
        res.status(400).json({
            message: 'Intet brugerID (userID)'
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
    
    console.log('/promoteadmin -> ' + user.email);

    let err3, newAdmin = await User.findOne({ _id: req.body.userID });
    if(err3 || !newAdmin) {
        res.status().json({
            message: 'Der skete en ukendt fejl prøv igen senere, eller kontakt en system admin',
            users: null
        });
        return;
    }

    newAdmin.isAdmin = !newAdmin.isAdmin;
    newAdmin.save();

    res.json({
        message: 'success'
    });
});

module.exports = router;