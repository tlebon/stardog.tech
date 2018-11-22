const mongoose = require('mongoose')
const Schema = mongoose.Schema

const collectionSchema = new Schema({
  main_title: {
    type: String,
    required: false,
    default:'Untitled Collection'
  }
  [{
    entry: [postSchema],
      chapter: {
        default: 0,
        required: false
      },

    }],
  likedByUser: [{ type: String }]


}, {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  })
module.exports = mongoose.model('Collection', collectionSchema)