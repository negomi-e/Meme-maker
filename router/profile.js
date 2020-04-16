const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('./auth/profile');
})

module.exports = router;
