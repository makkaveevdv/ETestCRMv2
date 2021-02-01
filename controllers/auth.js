const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const person = require('../models/Person.js');
const keys = require('../config/keys.js');
const errorHandler = require('../utils/errorHandler.js');

module.exports.login = async function (req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            message: 'Некорректные данные при входе в систему'
        });
    };

    const candidate = await person.personExistsByEmail(req.body.email);
    if (candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if (passwordResult) {
            //Генерация токена, пароли совпали

            const token = jwt.sign({
                email: candidate.email,
                personId: candidate.id
            }, keys.jwt, { expiresIn: 60 * 60 });

            const respPersonsList = await person.getRespPersons(candidate.id);
            if (respPersonsList) {
                respPersonsList.map(respPerson => (
                    delete respPerson.password
                ));
            };

            let userProfile = candidate;
            delete userProfile.password;

            res.status(200).json({
                token: `Bearer ${token}`,
                personId: candidate.id,
                userProfile: userProfile, 
                respPersonsList: respPersonsList
            });            
            //console.log("Authorization was successful!")
        } else {
            res.status(401).json({
                message: "Неправильный пароль!"
            });
            //console.log("Authorization is not passed!")
        };
    } else {
        res.status(404).json({
            message: "Пользователя с таким e-mail не существует."
        });
    };
};

module.exports.getallpersons = async function (req, res) {


    const allPersons = await person.getAllPersons();
        
    res.status(200).json(allPersons);
};

module.exports.register = async function (req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            message: 'Некорректные данные при входе в систему'
        });
    };

    const candidate = await person.personExistsByEmail(req.body.email);

    if (candidate) {
        res.status(409).json({
            message: 'Этот e-mail уже занят.'

        });
    } else {
        const salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(req.body.password, salt);
        const newPerson = new person(req.body.email, req.body.fname, req.body.mname, req.body.lname, password, req.body.managerid);

        try {
            
            if (await newPerson.save()) {
                res.status(201).json({
                    message: 'Пользователь зарегистрирован.'
                });
            } else res.status(409).json({
                message: 'Некорректные данные.'

            });
        } catch (e) {
            errorHandler(res, e);
        };
    };
};