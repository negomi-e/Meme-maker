const express = require('express');
const { sessionChecker } = require("../middleware/auth");
const User = require("../models/models.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const router = express.Router();

//Проверка на лог пользователя, если нету редирект на  /login
router.get('/', sessionChecker, function (req, res, next) {

  res.redirect('/login');
});

//проверка залогинился пользователь или нет, если нет, отправка на страницу регистрации
router.get('/signup', sessionChecker, function (req, res, next) {
  res.render('auth/register');
});

//создание нового пользователя 
router.post('/signup', sessionChecker, async function (req, res, next) {
  try {
    const { username, email, password } = req.body;
    const user = new User({
      username,
      email,
      password: await bcrypt.hash(password, saltRounds)
    });
    await user.save();
    req.session.user = user;
    return res.redirect("/entries");
  } catch (error) {
    next(error);
  }
});

router.route("/login")
  .get(sessionChecker, async (req, res) => {
    res.render("auth/login", { entries });
  })
  .post(async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.user = user;
      return res.redirect("/");
    } else {
      return res.redirect("/login");
    }
  })

router.get("/logout", async (req, res, next) => {
  if (req.session.user) {
    try {
      await req.session.destroy();
      res.clearCookie("user_sid");
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
