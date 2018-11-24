const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  email: {
    type: String,    //make a user.ref
    required: false,
    default: 'Anonymous'
  },
  profilePicture: {
    type:String,
    default: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Default_profile_picture_%28male%29_on_Facebook.jpg'},
  title: {
    type: String,
    required: false,
  },
  entry: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'Unsorted',
    required: true
  },
  private: {
    type: Boolean,
    default: false
  },
  likedByUser: [{ type: String }],

}, {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  })
module.exports = mongoose.model('Post', postSchema)


