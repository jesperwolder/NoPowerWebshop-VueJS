const express = require('express');
const router = express.Router();
let mongoose = require('mongoose');
let Fetcher = require('../../modules/Fetcher');
let Orders = require('../../Schema/OrderSchema');

const Validator = require('../../modules/validator');

router.get('/', async (req, res) => {
    let body = await Validator.ValidateJwt(req.headers.jwt);
    if(!body || !body.isAdmin) {
        res.status(403).json({
            Message: 'Du er ikke autoriseret til denne handling',
            Orders: null
        });
        return;
    }
    
    res.json({
        Message: 'Success',
        Statuses: [
            "Under håndtering",
            "Afventer pickup",
            "På vej",
            "Leveret",
            "Fejl",
            "Afbrudt"
        ]
    });
});

module.exports = router;