const router = require('express').Router();

router.get('/', (req, res) => {
  console.log(req.session.user)
  let user = req.session.user;
  res.render('./auth/profile', {user })
})

module.exports = router;
