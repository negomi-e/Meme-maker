const router = require('express').Router();
const {User, Meme} = require('../models/models');


router.get('/', async (req, res) => {
  // console.log(req.session.user)
  let user = req.session.user;
  let memes = await Meme.find({author: user.username})
  let admin = await User.find({username: req.session.user.username})
  let allUser = await User.find()
  
  // console.log(allUser)
  res.render('./auth/profile', { user, userMemes: memes, admin: admin[0].isAdmin, allUser})
  
})

router.post('/delete/:id', async (req, res, next) => {
    const userDelete = req.params.id
    await User.findByIdAndDelete(userDelete)
    res.redirect('/profile')
})


//TO DO
//How to delete a meme
router.get('/delete/:id', async (req, res)=>{
res.send('delete this')
})

module.exports = router;
