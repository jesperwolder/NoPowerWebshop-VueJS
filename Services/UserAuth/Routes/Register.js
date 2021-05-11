const express = require('express');
const mongoose = require('mongoose');
const User = require('../Schema/UserInfo.js')
const auth = require('../modules/authentication.js');
const router = express.Router();

router.post('/', async (req, res) => {
    if(
        !req.body.user ||
        !req.body.user.Email ||
        !req.body.user.Fullname ||
        !req.body.user.Password ||
        !req.body.user.Phone ||
        !req.body.user.Address ||
        !req.body.user.Address.Street ||
        !req.body.user.Address.Number ||
        !req.body.user.Address.Zip ||
        !req.body.user.Address.City
    ) {
        res.status(503).json({
            Authorized: false,
            Jwt: null,
            Message: "Nogle værdier var tomme"
        });
        return;
    }

    req.body.user.email = req.body.User.Email.toLowerCase();

    console.log("/register -> " + req.body.User.Email);

    let err, data = await User.findOne({ Email: req.body.User.Email });
    if(err) {
        res.status(503).json({ 
            Authorized: false,
            Jwt: null,
            Message: "Der skete en fejl, prøv igen senere"
        });
        return;
    }

    if(data != null) {
        res.status(409).json({
            Authorized: false,
            Jwt: null,
            Message: "Email allerede i brug"
        });
        return;
    }
    
    let hash = await auth.HashString(req.body.user.password);
    
    if(!hash){
        res.status(424).json({
            Authorized: false,
            Jwt: null,
            Message: "Der skete en fejl prøv igen senere"
        });
        return;
    }

    let user = new User(req.body.User);
    user._id = mongoose.Types.ObjectId();
    user.Password = hash;

    let jwt = auth.SignJwt({_id: user._id, Email: req.body.User.Email});

    user.save();
    res.status(200).json({
        Authorized: true,
        Jwt: jwt,
        isAdmin: false,
        Message: "Success"
    });
});

module.exports = router;