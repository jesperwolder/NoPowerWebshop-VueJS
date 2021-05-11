const express = require('express');
const auth = require('../modules/authentication.js');
const User = require('../Schema/UserInfo.js');

const router = express.Router();

router.post('/', async (req, res) => {
    if(!req.headers.jwt) {
        res.status(403).json({
            Authorized: false,
            Message: "Ikke Autoriseret"
        });
        return;
    }

    console.log("/auth -> " + auth.VerifyJwt(req.headers.jwt).Email);

    let authObj = auth.VerifyJwt(req.headers.jwt);
    if(!authObj) {
        res.status(403).json({
            Authorized: false,
            Message: "Ikke Autoriseret"
        });
        return;
    }

    let err, user = await User.findOne({ _id: authObj.id });
    if(err || !user) {
        res.status(403).json({
            Authorized: false,
            Message: "Der blev ikke fundet en brugere, prøv at logge ud og ind"
        });
        return;
    }

    res.status(200).json({
        Authorized: true,
        isAdmin: user.isAdmin,
        User: user,
        Message: "Success"
    });
});

module.exports = router;