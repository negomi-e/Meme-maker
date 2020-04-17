const router = require('express').Router();
const {User, Meme} = require("../models/models.js");

router.get('/', async (req, res) => {
  const recent = await Meme.recent()
  res.render('./index', {meme: recent});
})

module.exports = router;
