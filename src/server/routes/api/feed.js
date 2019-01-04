const express = require('express')
const router = express.Router()
const Coll = require("../../models/Coll")
// const authRoutes = require('./auth')
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
router.post('/entry/c/new', (req, res, next) => {
  console.log(req.body)
  let { entry, priv, title, genre, collection, chapter } = req.body;
  let coll = new Coll({
    coll: collection,
    email: req.user.email,
    profilePicture: req.user.profilePicture,
  })
  coll.entries.push({
    entry,
    title,
    chapter,
    type: genre,
    private: priv,
  })
  coll.save().then(result => {
    // console.log(result);
    res.send(coll)
  })
})

//queries the collections
router.post('/entry/c', (req, res, next) => {
  let collection = req.body.collection;
  console.log("REQ", req.body.collection)
  Coll.find({ 'coll': { "$regex": `${collection}`, "$options": "gi" } })
    .then(data => {
      // console.log(data)
      res.send(data)
    })
    .catch(err => {
      console.log(err);
    })
})

//adds to a current collection
router.put('/entry/c', (req, res, next) => {
  let { entry, priv, title, genre, collection, chapter } = req.body
  console.log(req.body)
  Coll.findOneAndUpdate({ 'coll': `${collection}` }, {
    $push: {
      entries: {
        entry,
        title,
        chapter,
        type: genre,
        private: priv
      },
    }
  }, { new: true })
    .then(data => {
      console.log(data)
      res.send(data)
    })
    .catch(err => {
      console.log(err)
    })
})

//gets the feed
router.get('/', (req, res, next) => {
  let posts = [];
  let collects = [];
  Post.find({})
    .sort([["created_at", -1]])
    .then(data => {
      posts = data;
      // console.log(posts)
      return Coll.find({})
        .sort([["updated_at", -1]])
        .then(data => {
          collects = data;
          res.send({ posts, collects });
        })
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

//deletes an entry from a collection or a whole collection
router.post('/entry/c/d', (req, res, next) => {

  const entry = req.body._id[0];
  const post = req.body._id[1]
  const coll = req.body._id


  //this isnt properly returning because of the if/else.- fixed with promise.resolve()
  console.log(entry, post, coll)
  if (coll.length == 2) {  //this is checking to see if i am returning a collection and a post or just a post
    // console.log("working if statment")
    Coll.findByIdAndUpdate({ _id: post }, { $pull: { entries: { _id: entry } } }, { new: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log(err);
      })
  }
  else {
    Coll.deleteOne({ _id: coll })
      .then(data => {
        console.log(data)
        // delId=coll
        res.send({ _id: coll });
      })
      .catch(err => {
        console.log(err);
      })
  }
  return Promise.resolve()
})

//EDIT ROUTES
//edit post
router.put('/entry/e', (req, res, next) => {
  let { entry, priv, title, genre, collection, chapter ,id} = req.body
  // console.log("req.body",req.body)
  Post.findOneAndUpdate({ '_id': `${id}` }, {
        entry,
        title,
        chapter,
        type: genre,
        private: priv    
  }, { new: true })
    .then(data => {
      console.log(data)
      res.send(data)
    })
    .catch(err => {
      console.log(err)
    })
})
module.exports = router;