const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  email: {
    type: String,    //make a user.ref
    required: true,
  },
  profilePicture: String,
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
    default: 'unsorted',
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


