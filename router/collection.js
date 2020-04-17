const router = require('express').Router();
const {Category, Meme} = require('../models/models')

router.get('/', (req, res) => {
  res.render('./collection/collection');
})

router.get('/maincat', async (req, res)=>{
  let maincat = req.body.selected;
  let model = Category.findAll({mainCategory: maincat});
  let subcats = model.subCategories;
  res.json({subcats})
})

router.get('/subcat', async (req, res)=>{
  let subcat = req.params.name;
  let memes = Meme.findAll({subCategory: subcat});
  res.json({memes})
})

router.get('/search', async (req, res)=>{
  let tag = req.body.searchInput;
  let memes = Meme.findAll({tags: tag});
  res.json({memes})
})

module.exports = router;
