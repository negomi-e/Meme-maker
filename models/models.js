const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  mainCategory: { type: String },
  subCategories: [{category: {type: String}}]
})


const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: String,
  profilePic: {
    img: String,
    data: Buffer,
    type: String,
  },
  joinedAt: Date,
  isAdmin: {
    type: Boolean,
    default: false,
      }
})

const memeSchema = mongoose.Schema({
  author: {type: String},
  mainCategory: {type: String},
  subCategory: {type: String},
  tags: [String],
  text: String,
  img: String,
  createdAt: Date,
})

//Most recent
memeSchema.statics.recent = async function(){
  let recent = await this.find().sort('createdAt').limit(4).exec();
  return recent;
}

const Category = mongoose.model('Category', categorySchema)
const User = mongoose.model('User', userSchema);
const Meme = mongoose.model('Meme', memeSchema);

module.exports = {
  User, Meme, Category
}
