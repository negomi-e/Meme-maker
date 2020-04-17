const { Category } = require('./models')
const mongoose = require('mongoose')
//Music
let cat1 = ['Pop', 'Rock', 'Classical', 'Baby Shark', 'Hip hop', 'Despacito']
//Video Games
let cat2 = ['Counter Strike', 'Super Mario', 'GTA', 'Fortnite']
//Animals
let cat3 = ['Puppies', 'Cats', 'Tigers', 'Lions', 'Zebras', 'Dogs', 'Kittens', 'Dolphins', 'Penguins']
//People
let cat4 = ['Chuck Norris', 'Angry baby', 'Chloe', 'Boy', 'Girl']

async function createCategory(name, array) {
  const connectionAddress = 'mongodb://localhost:27017/meme';
  mongoose.connect(connectionAddress, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connections;
  db.concat('error', console.error.bind(console, 'Error with MongoDB: '));
  console.log(array);

  const category = await new Category({
    mainCategory: name,
  })

  for (let index = 0; index < array.length; index++) {
    category.subCategories.push(array[index])

  }
  await category.save();
  console.log(category);
}

// createCategory('Music', cat1)
// createCategory('Video Games', cat2)
// createCategory('Animals', cat3)
// createCategory('People', cat4)