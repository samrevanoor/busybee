const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
},
    function (accessToken, refreshToken, profile, cb) {
        User.findOne({ 'googleId': profile.id })
            .then(function (user) {
                if (user) {
                    console.log("profile:", profile)
                    return cb(null, user);
                } else {
                    var newUser = new User({
                        name: profile.displayName,
                        firstName: profile.name.givenName,
                        email: profile.emails[0].value,
                        googleId: profile.id
                    });
                    return newUser.save();
                }
            })
            .then(function (newUser) {
                return cb(null, newUser);
            })
            .catch(function (err) {
                return cb(err)
            });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id)
        .then(function (user) {
            done(null, user);
        })
        .catch(function (err) {
            done(err);
        })
});