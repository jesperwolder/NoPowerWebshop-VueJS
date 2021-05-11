const express = require('express');
const router = express.Router();
const User = require('../Schema/UserInfo.js');

const auth = require('../modules/authentication.js');
const { ensureIndexes } = require('../Schema/UserInfo.js');

router.post('/', async (req, res) => {
    
    let obj = auth.VerifyJwt(req.headers.jwt);

    if(!obj) {
        res.status(403).json({
            Authorized: false,
            Mesage: "unauthorized"
        });
        return;
    }

    console.log('/update -> ' + obj.email);

    let err, user = await User.findOne({ _id: obj.id });
    if(err || !user) {
        res.status(404).json({
            Authorized: false,
            Message: "An unknown error has occured, try again later"
        });
        return;
    }

    user.Email = (req.body.User.Email ? req.body.User.Email : user.Email);
    user.Fullname = (req.body.User.Fullname ? req.body.User.Fullname : user.Fullname);
    user.Phone = (req.body.User.Phone ? req.body.User.Phone : user.Phone);
    user.Address.Street = (req.body.User.Address.Street ? req.body.User.Address.Street : user.Address.Street);
    user.Address.Number = (req.body.User.Address.Number ? req.body.User.Address.Number : user.Address.Number);
    user.Address.Zip = (req.body.User.Address.Zip ? req.body.User.Address.Zip : user.Address.Zip);
    user.Address.City = (req.body.User.Address.City ? req.body.User.Address.City : user.Address.City);

    user.save();

    res.status(200).json({
        Authorized: true,
        Mesage: 'success'
    });

});

module.exports = router;