const { OAuth2Client } = require("google-auth-library");
const Visitor = require("../models/Visitor");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleOneTapLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ message: "Missing credential" });
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

    res.status(200).json({
      success: true,
      visitorId: visitor._id,
      name: visitor.name,
      email: visitor.email,
    });
  } catch (error) {
    console.error("Google One Tap error:", error);
    res.status(401).json({ message: "Invalid Google token" });
  }
};
