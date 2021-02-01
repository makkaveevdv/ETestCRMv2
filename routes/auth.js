const express = require('express');
const passport = require('passport');
const { check } = require('express-validator');
const controller = require('../controllers/auth')
const router = express.Router();

//localhost:1337/api/auth/login
router.post(
    '/login',
    [
        check('email', 'Некорректный e-mail').normalizeEmail().isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({min: 6})
    ],
    controller.login);

//localhost:1337/api/auth/register
router.get('/register', passport.authenticate('jwt', { session: false }), controller.getallpersons);

router.post('/register', passport.authenticate('jwt', { session: false }),
    [
        check('email', 'Некорректный e-mail').normalizeEmail().isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 }),
        check('fname', 'Минимальная длина пароля 6 символов').isLength({ min: 1 }),
        check('lname', 'Минимальная длина пароля 6 символов').isLength({ min: 1 })
    ],
    controller.register);


module.exports = router;