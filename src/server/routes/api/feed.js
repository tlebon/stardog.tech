const express = require('express')
const router = express.Router()
const Post = require("../../models/Post")
const authRoutes = require('./auth')



router.post('/blog', (req, res,next) => {
  let {blog} = req.body;
let post = new Post({
  blog, 
  email:req.user.email,
  profilePicture:req.user.profilePicture,
})
post.save().then(result =>{
  console.log(result);
  res.send(post)
})
})

router.get('/feed', (req,res,next)=>{
  Post.find({})
  .sort([["created_at", -1]])
  .then(data=>{
    res.send(data);
  })
  .catch(err=>{
    console.log(err);
  })
})


module.exports = router