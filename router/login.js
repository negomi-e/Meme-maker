const router = require('express').Router();
const { User } = require("../models/models.js");
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
  res.render('./auth/login');

})

router.post("/", async (req, res) => {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.user = user;
      return res.redirect("/");
    } else {
      return res.redirect("/login");
    }
  })







module.exports = router;
