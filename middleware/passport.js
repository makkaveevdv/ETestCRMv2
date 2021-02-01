const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('../config/keys');
const person = require('../models/Person.js');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
};

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
                const loginedPerson = (await person.personExistsById(payload.personId));

                //Нужно будет использовать только email и id (а не весь объект)

                if (loginedPerson) {
                    done(null, loginedPerson);
                } else {
                    done(null, false);
                }
            } catch {
                console.log(e);
            };           

        })
    );
};