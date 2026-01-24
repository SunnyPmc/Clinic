// const express = require("express");
// const passport = require("passport");
// const router = express.Router();

// // 1️⃣ Route to trigger Google OAuth
// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// // 2️⃣ Callback route
// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "/", // redirect if login fails
//   }),
//   (req, res) => {
//     // Successful login → redirect to frontend
//     res.redirect("http://localhost:5173"); // replace with frontend in prod
//   }
// );

// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const { OAuth2Client } = require("google-auth-library");
// const Visitor = require("../models/Visitor");


// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// /**
//  * Google One Tap login (visitors)
//  */
// router.post("/google/onetap", async (req, res) => {
//   try {
//     const { token } = req.body;

//     if (!token) {
//       return res.status(400).json({ message: "Token missing" });
//     }

//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const payload = ticket.getPayload();

//     let visitor = await Visitor.findOne({ googleId: payload.sub });

//     if (!visitor) {
//       visitor = await Visitor.create({
//         googleId: payload.sub,
//         email: payload.email,
//         name: payload.name,
//       });
//     } else {
//       visitor.lastVisitAt = new Date();
//       await visitor.save();
//     }

//     // Attach visitor to session (Passport)
//     req.login(visitor, (err) => {
//       if (err) {
//         return res.status(500).json({ message: "Session login failed" });
//       }
//       res.status(200).json({ success: true });
//     });
//   } catch (error) {
//     console.error("One Tap error:", error);
//     res.status(401).json({ message: "Invalid Google token" });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const Visitor = require("../models/Visitor");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Google One Tap login (VISITORS)
 * Stateless, no passport, no session
 */
router.post("/google/onetap", async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ message: "Credential missing" });
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const {
      sub: googleId,
      email,
      name,
      picture,
      email_verified,
    } = payload;

    if (!email_verified) {
      return res.status(403).json({ message: "Email not verified" });
    }

    let visitor = await Visitor.findOne({ googleId });

    if (!visitor) {
      visitor = await Visitor.create({
        googleId,
        email,
        name,
        avatar: picture,
        provider: "google",
        firstVisitAt: new Date(),
        lastVisitAt: new Date(),
      });
    } else {
      visitor.lastVisitAt = new Date();
      await visitor.save();
    }

    return res.status(200).json({
      success: true,
      visitorId: visitor._id,
    });
  } catch (error) {
    console.error("Google One Tap error:", error.message);
    return res.status(401).json({ message: "Invalid Google token" });
  }
});

module.exports = router;


