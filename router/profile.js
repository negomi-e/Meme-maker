const router = require('express').Router();
const {User, Meme} = require('../models/models');


router.get('/', async (req, res) => {
  console.log(req.session.user)
  let user = req.session.user;
  let memes = await Meme.find({author: user.username})
  res.render('./auth/profile', {user, userMemes: memes})
})

//TO DO
//How to delete a meme
router.get('/delete/:id', async (req, res)=>{
res.send('delete this')
})

module.exports = router;
