const express = require("express");
const router = express.Router();

// Example user profile route
router.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      displayName: req.user.displayName,
      email: req.user.email,
      photo: req.user.photo,
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
