const router = require('express').Router();

const {Category, Meme} = require('../models/models')



router.get('/', async (req, res) => {
  let mainCat = await Category.find()
  console.log(mainCat);
  res.render('./collection/create', {mainCat});
})




//Save meme
router.post('/save', async (req, res) => {
  const meme = new Meme({
    img: req.body.imgData,
    createdAt: new Date(),
    author: req.session.user.username,
    mainCategory: req.body.mainCat,
    subCategory: req.body.subCat,
  })
  await meme.save();
  res.json({
    success: true,
  })
});


module.exports = router;
