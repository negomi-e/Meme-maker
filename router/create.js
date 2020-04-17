const router = require('express').Router();
const {Category, Meme} = require('../models/models')

router.get('/', async (req, res) => {
  let mainCat = await Category.find()
  console.log(mainCat);
  res.render('./collection/create', {mainCat});
})

// SAVE THE NEW IMAGE /save?
// router.post('/', async (req, res)=>{
//   console.log(req.body);
  
//   let newmeme = new Meme({
//       author: req.session.user.username,
//       mainCategory: req.body,
//       subCategory: req.body,
//       text: req.body.text,
//       createdAt: new Date()
//   })

//   // await newmeme.save()
//   res.redirect('/')
// })

module.exports = router;
