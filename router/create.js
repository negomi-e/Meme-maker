const router = require('express').Router();
const { Meme } = require('../models/models');
const mongoose = require('mongoose');
const connectionAddress = 'mongodb://localhost:27017/meme';
mongoose.connect(connectionAddress, { useNewUrlParser: true, useUnifiedTopology: true });


router.get('/', (req, res) => {
  res.render('./collection/create');
})


//Save meme
router.post('/save', async (req, res) => {
  const meme = new Meme({
    img: req.body.imgData,
    createdAt: new Date(),
    author: req.session.user.username,
  })
  await meme.save();
  res.json({
    success: true,
  })
});



module.exports = router;
