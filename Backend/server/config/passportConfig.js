require("dotenv").config()
const passport= require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../model/userModel.js');
const { generateToken } = require("../utils/generateJWT.js");

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        scope:["profile","email"],
    },
    async (accessToken, refreshToken, profile, callback) => {
        try {
            const existingUser = await User.findOne({ $or: [{ googleId: profile.id }, { email: profile.emails[0].value }] });

            if (existingUser) {
                existingUser.googleId = profile.id;
                existingUser.userName = profile.displayName;
                existingUser.email = profile.emails[0].value;
                existingUser.picture = profile.photos[0].value;
                existingUser.email_verified = true;
                await existingUser.save();

                callback(null, existingUser);
            } 
            else {
                const newUser = new User({
                    googleId: profile.id,
                    userName: profile.displayName,
                    email: profile.emails[0].value,
                    password: "google",
                    picture: profile.photos[0].value,
                    email_verified: true,
                });

                await newUser.save();
                callback(null, newUser);
            }
        } 
        catch (error) {
            console.error('Error in Google Strategy:', error);
            callback(error, null);
        }
    
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
  