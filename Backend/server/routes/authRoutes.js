const router = require("express").Router();
const authController = require("../controller/authController.js");
const { generateToken, verifyToken } = require("../utils/generateJWT.js");

router.post("/userRegistration", authController.userRegistration);
router.post("/userLogin", authController.userLogin);

router.get("/user", verifyToken, authController.getUserData);

// google auth
router.get("/google", authController.google);
router.get("/google/callback", authController.gCallbacks, async (req, res) => {
  try {
    const token = await generateToken({
      username: req.user.userName,
      email: req.user.email,
      picture: req.user.picture,
    });
    res.redirect(`${process.env.CLIENT_URL}?token=${token}`);
  } catch (err) {
    console.log(err);
  }
});

// facebook auth
router.get("/facebook", authController.facebook);
router.get(
  "/facebook/callback",
  authController.fbCallbacks,
  async (req, res) => {
    try {
      const token = await generateToken({
        username: req.user.userName,
        email: req.user.email,
        picture: req.user.picture,
      });
      res.redirect(`${process.env.CLIENT_URL}?token=${token}`);
    } catch (err) {
      console.log(err);
    }
  }
);

module.exports = router;
