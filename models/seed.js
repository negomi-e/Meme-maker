const {Category} = require('./models')
const mongoose = require('mongoose')
//Music
let cat1 = [ 'Pop', 'Rock', 'Classical', 'Baby Shark', 'Hip hop', 'Despacito']
//Video Games
let cat2 = [ 'Counter Strike', 'Super Mario', 'GTA', 'Fortnite']
//Animals
let cat3 = [ 'Puppies', 'Cats', 'Tigers', 'Lions', 'Zebras', 'Dogs', 'Kittens', 'Dolphins', 'Penguins']
//People
let cat4 = ['Chuck Norris', 'Angry baby', 'Chloe', 'Boy', 'Girl']

async function createCategory(name, array){
    const category = await new Category({
        mainCategory: name,
        subcategory: array
      });
      await category.save();
    
      return category
}

// createCategory('Music', cat1)
// createCategory('Video Games', cat2)
// createCategory('Animals', cat3)
// createCategory('People', cat4)


