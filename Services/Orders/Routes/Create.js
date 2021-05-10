const express = require('express');
const router = express.Router();

const Validator = require('../modules/validator.js');

router.get('/', (req, res) => {
    Validator.ValidateJwt(req.headers.jwt);
});

module.exports = router;