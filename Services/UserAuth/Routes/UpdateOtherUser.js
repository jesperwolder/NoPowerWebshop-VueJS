const express = require('express');
const auth = require('../modules/authentication');
const User = require('../Schema/UserInfo');

const router = express.Router();

router.post('/', async (req, res) => {
    if(!req.headers.jwt || !req.body.User || !req.body.User._id) {
        res.status(503).json({
            Message: "manglende værdier",
            User: null
        });
        return;
    }

    let jwt = auth.VerifyJwt(req.headers.jwt);
    let checkErr, admin = await User.findById(jwt._id);
    if(checkErr || !admin || !admin.isAdmin) {
        res.status(403).json({
            Message: "Ikke autoriseret",
            User: null
        });
        return;
    }

    let err, user = await User.findById(req.body.User._id);
    if(err || !user) {
        res.status(404).json({
            Message: "Bruger ikke fundet",
            User: null
        });
        return;
    }

    let newUserVals = new User(req.body.User);

    user.Email = (newUserVals.Email ? newUserVals.Email : user.Email);
    user.Fullname = (newUserVals.Fullname ? newUserVals.Fullname : user.Fullname);
    user.Phone = (newUserVals.Phone ? newUserVals.Phone : user.Phone);
    user.Address.street = (newUserVals.Address.Street ? newUserVals.Address.Street : user.Address.Street);
    user.Address.Number = (newUserVals.Address.Number ? newUserVals.Address.Number : user.Address.Number);
    user.Address.Zip = (newUserVals.Address.Zip ? newUserVals.Address.Zip : user.Address.Zip);
    user.Address.City = (newUserVals.Address.City ? newUserVals.Address.City : user.Address.City);

    user.save();

    res.json({
        Message: "success",
        User: user
    });
});

module.exports = router;