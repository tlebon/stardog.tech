const express = require('express')
const router = express.Router()
const AnonPost = require("../../models/Post")
const authRoutes = require('./auth')
const Post= require("../../models/User")



router.post('/blog/', (req, res,next) => {
  console.log(req.body)
  let {blog,priv} = req.body;
let post = new AnonPost({
  blog, 
  private:priv,
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

router.post('/delete',(req,res,next)=>{
  let del= req.body;
  Post.deleteOne({_id:del._id})
  .then(data=>{
    console.log(data)
    res.send({_id:del._id});
  })
  .catch(err=>{
    console.log(err);
  })
})

module.exports = router