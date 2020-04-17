const express = require('express');
const { sessionChecker } = require("../middleware/auth");
const { User } = require("../models/models.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const router = express.Router();





router.get('/', (req, res) => {
  res.render('./auth/register');

})



router.post('/', sessionChecker, async function (req, res, next) {
  try {
    const { email, username, password } = req.body;
    console.log('PRE MONGOOSE', req.body);
    
    const user = await new User({
      email,
      username,
      password: await bcrypt.hash(password, saltRounds),
      joinedAt: new Date()
    });
    await user.save();
    
    console.log('MONGOOSE SAVED OBJECT', user);
    console.log(req.session)
    req.session.user = user;

    console.log('NEW SESSION>>>>>>', req.session.user);
    
    return res.redirect("/");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
