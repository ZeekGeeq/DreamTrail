const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', passport.authenticate('google',
   { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('http://localhost:3001/profile'); // redirect to profile
  }
);
router.get('/check', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      authenticated: true,
      user: {
        displayName: req.user.displayName,
        email: req.user.email,
        photo: req.user.photo
      }
    });
  } else {
    // authentication fails
    res.json({ authenticated: false });
  }
});

module.exports = router;
