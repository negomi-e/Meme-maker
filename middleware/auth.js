//Функция для проверки логина у юзера

const sessionChecker = (req, res, next) => {
  if (req.session.user) {
    res.redirect("/");
  } else {
    next();
  }
}
// Та же фнукция только наоборот, если нет логина, отправляет на страницу логаться
const nounSessionChecker = (req, res, next) => {
  if (!req.session.user) {
    res.redirect("/login");
  } else if (req.session.user) {
    next();
  }
};

// Функция для очистки куков

function cookiesCleaner(req, res, next) {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
  }
  next();
}

function isLoggedin (req, res, next) {
  if (req.session.user) {
    res.locals.isLoggedin = true;
  } 
  next();
}

module.exports = {
  sessionChecker,
  nounSessionChecker,
  cookiesCleaner,
  isLoggedin,
}
