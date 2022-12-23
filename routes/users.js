const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const users = require('../controllers/users')

router.route("/register") 
  .get(users.renderUserForm)
  .post(catchAsync(users.registerUser))

router.route("/login")
  .get(users.renderLogin)
  .post(passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
    keepSessionInfo: true,
  }),
  users.loginUser
);

router.get("/logout", users.logoutUser);


module.exports = router;
