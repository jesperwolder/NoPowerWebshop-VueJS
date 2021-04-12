const express = require('express');
const router = express.Router();
const User = require('../Schema/UserInfo.js');

const auth = require('../modules/authentication.js');
const { ensureIndexes } = require('../Schema/UserInfo.js');

router.post('/', async (req, res) => {
    
    let obj = auth.VerifyJwt(req.headers.jwt);

    if(!obj) {
        res.status(403).json({
            authorized: false,
            mesage: "unauthorized"
        });
        return;
    }

    console.log('/update -> ' + obj.email);

    let err, user = await User.findOne({ _id: obj.id });
    if(err || !user) {
        res.status(404).json({
            message: "An unknown error has occured, try again later"
        });
        return;
    }

    user.email = (req.body.user.email ? req.body.user.email : user.email);
    user.fullname = (req.body.user.fullname ? req.body.user.fullname : user.fullname);
    user.phone = (req.body.user.phone ? req.body.user.phone : user.phone);
    user.address.street = (req.body.user.address.street ? req.body.user.address.street : user.address.street);
    user.address.number = (req.body.user.address.number ? req.body.user.address.number : user.address.number);
    user.address.zip = (req.body.user.zip ? req.body.user.address.zip : user.address.zip);
    user.address.city = (req.body.user.city ? req.body.user.address.city : user.address.city);

    user.save();

    res.status(200).json({
        mesage: 'success'
    });

});

module.exports = router;