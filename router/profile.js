const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { User, Meme } = require('../models/models');

router.get('/', async (req, res) => {
  // console.log(req.session.user)
  let user = req.session.user;
  let memes = await Meme.find({ author: user.username })
  let admin = await User.find({ username: req.session.user.username })
  let allUser = await User.find()
  res.render('./auth/profile', { user, userMemes: memes, admin: admin[0].isAdmin, allUser })
})

router.post('/delete/:id', async (req, res, next) => {
  const userDelete = req.params.id
  await User.findByIdAndDelete(userDelete)
  res.redirect('/profile')
})

//TO DO
//How to delete a meme
router.get('/delete/:id', async (req, res) => {
  res.send('delete this')
});

const upload = multer({ dest: 'public/images' })
// считывает содержимое/название картинок в папке
router.post('/addAvatar', upload.single('avatar'), async (req, res) => {
  const userId = req.session.user._id;
  let images = await User.findById({ _id: userId });
  const temp = images;
  let pathImage = req.file.path.slice(7)
  res.render('auth/profile', { pathImage })
})

module.exports = router;
