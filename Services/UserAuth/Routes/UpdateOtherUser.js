const express = require('express');
const auth = require('../modules/authentication');
const User = require('../Schema/UserInfo');

const router = express.Router();

router.post('/', async (req, res) => {
    if(!req.headers.jwt || !req.body.user || !req.body.user._id) {
        res.status(503).json({
            message: "manglende værdier",
            user: null
        });
        return;
    }

    let jwt = auth.VerifyJwt(req.headers.jwt);
    let checkErr, admin = await User.findById(jwt.id);
    if(checkErr || !admin || !admin.isAdmin) {
        res.status(403).json({
            message: "Ikke autoriseret",
            user: null
        });
        return;
    }

    let err, user = await User.findById(req.body.user._id);
    console.log(err);
    if(err || !user) {
        res.status(404).json({
            message: "Bruger ikke fundet",
            user: null
        });
        return;
    }

    let newUserVals = new User(req.body.user);

    user.email = (newUserVals.email ? newUserVals.email : user.email);
    user.fullname = (newUserVals.fullname ? newUserVals.fullname : user.fullname);
    user.phone = (newUserVals.phone ? newUserVals.phone : user.phone);
    user.address.street = (newUserVals.address.street ? newUserVals.address.street : user.address.street);
    user.address.number = (newUserVals.address.number ? newUserVals.address.number : user.address.number);
    user.address.zip = (newUserVals.zip ? newUserVals.address.zip : user.address.zip);
    user.address.city = (newUserVals.city ? newUserVals.address.city : user.address.city);

    user.save();

    res.json({
        message: "success",
        user: user
    });
});

module.exports = router;