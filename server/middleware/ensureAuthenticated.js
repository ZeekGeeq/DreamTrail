module.exports = (req, res, next) => {
  console.log("Session details:", req.session);
  console.log("Authenticated User:", req.user);

  if (req.isAuthenticated()) {
    return next();
  }
  res
    .status(401)
    .json({ error: "Logged out or otherwise failed Auth. Log back in." });
};
