const mongoose = require('mongoose');
const { Meme, User } = require('./models');
const fs = require('fs');

const URI = 'mongodb://localhost:27017/meme-maker';

mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true });

const admin = new User({
  email: 'bla-bla@gmail.com',
  name: 'A',
  password: '1',
  isAdmin: true,
})

const user = new User({
  email: 'cat@gmail.com',
  name: 'Jora',
  password: '1234',
})

const mem = new Meme({
  author: user._id,
  text: 'Just a cat',
  tags: ['cat', 'aphina'],
  img: fs.readFileSync(`${__dirname}/../img/cat1.jpg`),
})
const mem2 = new Meme({
  author: user._id,
  text: 'Another cat',
  tags: ['cat', 'murka'],
  img: fs.readFileSync(`${__dirname}/../img/cat7.jpg`),
})
const mem3 = new Meme({
  author: admin._id,
  text: 'super cat',
  tags: ['cat', 'tiger'],
  img: fs.readFileSync(`${__dirname}/../img/cat5.jpg`),
})

user.save();
admin.save();
mem.save();
mem2.save();
mem3.save();
