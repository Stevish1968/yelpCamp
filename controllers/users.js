const passport = require("passport");
const User = require("../models/user");

module.exports.renderUserForm = (req, res) => {
    res.render("users/register");
  }

  module.exports.registerUser = async (req, res) => {
    try {
      const { email, username, password } = req.body;
      const user = new User({ email, username });
      const registeredUser = await User.register(user, password);
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash("success", "welcome to yelp camp");
        res.redirect("/campgrounds");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/register");
    }
  }

  module.exports.renderLogin = (req, res) => {
    res.render("users/login");
  }

  module.exports.logoutUser = (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Goodbye");
      res.redirect("/campgrounds");
    });
  }

  module.exports.loginUser = (req, res) => {
    const redirectUrl = req.session.returnTo || "/campgrounds";
    res.redirect(redirectUrl);
  }