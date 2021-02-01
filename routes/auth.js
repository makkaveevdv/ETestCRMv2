const express = require('express');
const passport = require('passport');
const { check } = require('express-validator');
const controller = require('../controllers/auth')
const router = express.Router();

//localhost:1337/api/auth/login
router.post(
    '/login',
    [
        check('email', '������������ e-mail').normalizeEmail().isEmail(),
        check('password', '����������� ����� ������ 6 ��������').isLength({min: 6})
    ],
    controller.login);

//localhost:1337/api/auth/register
router.get('/register', passport.authenticate('jwt', { session: false }), controller.getallpersons);

router.post('/register', passport.authenticate('jwt', { session: false }),
    [
        check('email', '������������ e-mail').normalizeEmail().isEmail(),
        check('password', '����������� ����� ������ 6 ��������').isLength({ min: 6 }),
        check('fname', '����������� ����� ������ 6 ��������').isLength({ min: 1 }),
        check('lname', '����������� ����� ������ 6 ��������').isLength({ min: 1 })
    ],
    controller.register);


module.exports = router;