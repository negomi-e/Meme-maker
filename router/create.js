const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('./collection/create');
})

module.exports = router;
