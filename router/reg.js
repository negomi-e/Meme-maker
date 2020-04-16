const express = require('express');
const { sessionChecker } = require("../middleware/auth");
const { User } = require("../models/models.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const router = express.Router();





router.get('/', (req, res) => {
  res.render('auth/register');

})



router.post('/', async function (req, res, next) {
  try {
    const { email, username, password } = req.body;
    const user = await new User({
      email,
      username,
      password: await bcrypt.hash(password, saltRounds)
    });
    await user.save();
    
    req.session.user = user;
    return res.redirect("/");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
