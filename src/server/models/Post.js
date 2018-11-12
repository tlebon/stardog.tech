const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
 blog:{
   type: String,
   required:true,
 },
 email:{
   type:String,
   required:true,
 },  
 profilePicture: String,
 likedByUser: [{ type: String }]


},  {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
})
module.exports = mongoose.model('Post', postSchema)