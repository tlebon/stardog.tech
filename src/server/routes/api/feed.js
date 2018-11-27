const express = require('express')
const router = express.Router()
const Coll = require("../../models/Coll")
const authRoutes = require('./auth')
const Post = require("../../models/Post")


//posts a single entry to the database
router.post('/entry/', (req, res, next) => {
  console.log(req.body)
  let { entry, priv, title, type } = req.body;
  let post = new Post({
    entry,
    title,
    type,
    private: priv,
    email: req.user.email,
    profilePicture: req.user.profilePicture,
  })
  post.save().then(result => {
    console.log(result);
    res.send(post)
  })
})
//posts a new collection
router.post('/entry/c', (req, res, next) => {
  console.log(req.body)
  let { entry, priv, title, type, collection, chapter } = req.body;
  let coll = new Coll({
    coll: collection,
    email: req.user.email,
    profilePicture: req.user.profilePicture,
  })
  coll.entries.push({
    entry,
    title,
    chapter,
    type,
    private: priv,
  })
  coll.save().then(result => {
    console.log(result);
    res.send(coll)
  })
})

//gets the feed
router.get('/', (req, res, next) => {
  Post.find({})
    .sort([["created_at", -1]])
    .then(data => {
      res.send(data)
      // Coll.find({})
      //   .sort([["created_at", -1]])
      //   .then(data => {
      //     res.send(data);})
    })
    .catch(err => {
      console.log(err);
    })
})
//deletes an entry
router.post('/entry/d', (req, res, next) => {
  let del = req.body;
  Post.deleteOne({ _id: del._id })
    .then(data => {
      console.log(data)
      res.send({ _id: del._id });
    })
    .catch(err => {
      console.log(err);
    })
})

module.exports = router