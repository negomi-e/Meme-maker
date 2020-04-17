const router = require('express').Router();
const {Category, Meme} = require('../models/models')

router.get('/', async (req, res) => {
  let mainCat = await Category.find()
  res.render('./collection/collection', {mainCat});
})

router.get('/maincat/:name', async (req, res)=>{
  let maincat = req.params.name;
  let model = await Category.findOne({mainCategory: maincat});
  // console.log(model);
  
  let subcats = model.subCategories;
  // console.log(subcats);
  
  res.json({subcats})
})

router.get('/subcat/:name', async (req, res)=>{
  let subcat = req.params.name;
  let memes = await Meme.findAll({subCategory: subcat});
  res.json({memes})
})

router.post('/search/:tag', async (req, res)=>{
  let tag = req.body.input
  let memes = await Meme.findAll({tags: tag});
  res.json({memes})
})

module.exports = router;
