const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
 post:{
   type: String,
   required:true,
 },
 


})
module.exports = mongoose.model('Post', postSchema)