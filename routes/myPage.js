const express = require('express');
const controller = require('../controllers/myPage');
const router = express.Router();
const passport = require('passport');

//localhost:1337/api/myPage
router.post('/', passport.authenticate('jwt', { session: false }), controller.getTasksforme);


module.exports = router;