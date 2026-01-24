const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Visitor = require("../models/Visitor"); // or Admin model if you have one

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value || null;

        let visitor = await Visitor.findOne({ googleId: profile.id });

        if (!visitor) {
          visitor = await Visitor.create({
            googleId: profile.id,
            email,
            name: profile.displayName,
            provider: "google",
            role: "admin", // optional: mark admin explicitly
            lastVisitAt: new Date(),
          });
        } else {
          visitor.lastVisitAt = new Date();
          await visitor.save();
        }

        return done(null, visitor);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// session handling
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Visitor.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
