const router = require('express').Router();
const { User, Meme } = require("../models/models.js");

router.get('/', async (req, res) => {
  const recent = await Meme.find().sort({ createdAt: -1 }).limit(4);
  res.render('./index', { memes: recent });
})

module.exports = router;
