const express = require('express');
const User = require('../Schema/UserInfo');
const auth = require('../modules/authentication');

const router = express.Router();

router.post('/:status', async (req, res) => {
    if(!req.headers.jwt) {
        res.status(403).json({
            Message: "Ikke autoriseret",
            User: null
        });
        return;
    }

    if(!req.body.UserID) {
        res.status(400).json({
            Message: 'Intet brugerID (userID)',
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
    
    let err2, user = await User.findOne( { _id: jwt._id } );
    if(err2 || !user || !user.isAdmin) {
        res.status(403).json({
            Message: "Ikke autoriseret",
            User: null
        });
        return;
    }
    
    console.log('/changePrivilege -> ' + user.Email);

    let err3, newAdmin = await User.findOne({ _id: req.body.UserID });
    if(err3 || !newAdmin) {
        res.status().json({
            Message: 'Der skete en ukendt fejl prøv igen senere, eller kontakt en system admin',
            Users: null
        });
        return;
    }

    if(req.params.status == "true"){
        newAdmin.isAdmin = true;
    }else {
        newAdmin.isAdmin = false;
    }

    newAdmin.save();

    res.json({
        Message: 'success',
        User: newAdmin
    });
});

module.exports = router;