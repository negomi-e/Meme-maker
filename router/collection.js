const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('./collection/collection');
})

module.exports = router;
