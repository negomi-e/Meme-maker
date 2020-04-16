const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
  email: String,
  name: String,
  password: String,
  profilePic: {
    data: Buffer,
    type: String,
  }
  isAdmin: {
    type: Boolean,
    default: false,
  }
})

const memeSchema = mongoose.Schema({
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  tags: [String],
  text: String,
  img: {
    data: Buffer,
    type: String,
  }
})

const User = mongoose.model('User', userSchema);
const Meme = mongoose.model('Meme', memeSchema);

module.exports = {
  User, Meme,
}
