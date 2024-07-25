require("dotenv").config();
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../model/userModel.js");

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_SECRET_KEY,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, callback) {
      try {
        const existingUser = await User.findOne({ facebookId: profile.id });

        if (existingUser) {
          existingUser.facebookId = profile.id;
          existingUser.userName = profile.displayName;
          existingUser.email = profile.emails[0].value;
          existingUser.picture = profile.photos[0].value;
          existingUser.email_verified = true;
          await existingUser.save();

          return callback(null, existingUser);
        } 
        else {
          const newUser = new User({
            facebookId: profile.id,
            userName: profile.displayName,
            email: profile.emails[0].value,
            password: "facebook",
            picture: profile.photos[0].value,
            email_verified: true,
          });

          await newUser.save();
          return callback(null, newUser);
        }
      } 
      catch (error) {
        console.error("Error in Google Strategy:", error);
        callback(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } 
  catch (err) {
    done(err, null);
  }
});