const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const postSchema = require('./Post')


const entrySchema = new Schema({
  title: {
    type: String,
    required: false,
  },
  entry: {
    type: String,
    required: true,
  },
  chapter: {
    default: 0,
    required: false
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
})

const collSchema = new Schema({
  coll: {
    type: String,
    required: false,
    default: 'Untitled Collection'
  },
  email: {
    type: String,    //make a user.ref
    required: false,
    default: 'Anonymous'
  },
  profilePicture: {
    type: String,
    default: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Default_profile_picture_%28male%29_on_Facebook.jpg'
  },
  entries: [entrySchema],
  likedByUser: [{ type: String }]
}, {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  })


module.exports = mongoose.model('Coll', collSchema)