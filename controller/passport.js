
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose');
const User = mongoose.model('user');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
};

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });

    }));
}
