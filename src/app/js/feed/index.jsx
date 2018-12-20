import React, { Component } from 'react';
import Blog from './Blog'
import Feed from './Feed'
import api from "../utils/api"

class Index extends Component {
  constructor(props) {
    super(props)

    this.state = {
      entry: '',
      loading: true,
      priv: false,
      feed: [],
      collFeed: [],
      title: "",
      genre: "Unsorted",
      collectionCheck: false,
      collection: "",
      collectionRes: [],
      chapter: '',
      unsorted: true,
      found: false,
      error: ""
    }
    this._submitHandler = this._submitHandler.bind(this);
    this._feedHandler = this._feedHandler.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleCollectionSearch = this._handleCollectionSearch.bind(this);
    this._handleCollectionUpdate = this._handleCollectionUpdate.bind(this);
    this._deleteHandler = this._deleteHandler.bind(this);
    // this._handleCheck = this._handleCheck.bind(this);
  }

  componentDidMount() {
    api
      .get(`/api/feed/`)
      .then(data => {
        console.log(data)
        this.setState({
          feed: data.posts,
          collFeed: data.collects,
          loading: false
        })
      })
  }


  //submits collections or entries or adds to a current collection (if selected)
  _submitHandler(entry, priv, title, genre, collection, chapter) {
    if (this.state.entry === '' || this.state.entry == null) {
      this.setState({
        error: "Enter a post!"
      })
      // return  setTimeout((this.setState({error:''})),3000)
    }
    if (this.state.collection === '' || this.state.collectionRes === "") {
      api
        .post('/api/feed/entry', { entry, priv, title, genre })
        .then(data => {
          this.setState({
            feed: [data, ...this.state.feed],
            entry: '',
            priv: false,
            title: "",
            genre: "Unsorted",
            error: "",
          });
          // console.log(this.state.feed)
        })
        .catch(err => {
          this.setState({
            error: err.description,
            entry: ""
          })
        })
    }
    else if (this.state.collection !== "" && this.state.found === false) {
      api
        .post('/api/feed/entry/c/new', { entry, priv, title, genre, collection, chapter })
        .then(data => {
          this.setState({
            collFeed: [data, ...this.state.collFeed],
            entry: '',
            priv: false,
            title: "",
            genre: "Unsorted",
            collectionCheck: false,
            collection: "",
            chapter: "",
            error: "",
          });
          // console.log(this.state.feed)
        })
        .catch(err => {
          this.setState({
            error: err.description,
            entry: ""
          })
        })
    }
    else if (this.state.found == true) {
      api
        .put('/api/feed/entry/c/', { entry, priv, title, genre, collection, chapter })
        .then(data => {
          this.setState({
            collFeed: [data, ...this.state.collFeed.filter(item => {
              if (data._id !== item._id) return true;
              return false;
            })],
            entry: '',
            priv: false,
            title: "",
            genre: "Unsorted",
            collectionCheck: false,
            collection: "",
            chapter: "",
            error: "",
            found: false
          });
          // console.log(this.state.feed)
        })
        .catch(err => {
          this.setState({
            error: err.description,
            entry: ""
          })
        })

    }
  }

  // deletes collections or entries from the feed
  _deleteHandler(entry, post) {
    // console.log('entry', entry, 'post', post)
    if (this.state.unsorted == true) {
      api
        .post('/api/feed/entry/d', entry)
        .then(data => {
          this.setState({
            feed: this.state.feed.filter(el => {
              if (el._id !== data._id) return true;
              return false;
            })
          })
        })
        .catch(err => {
          this.setState({
            error: err.description,
          })
        })
    }
    if (this.state.unsorted === false) {
      api
        .post('/api/feed/entry/c/d', entry, post)
        .then(data => {
          // console.log("data", data)
          if (data.coll) {
            this.setState({
              collFeed: [data, ...this.state.collFeed.filter(post => {
                if (post._id !== data._id) return true;
                return false;
              })]
              //NOTE:we can apply a sort to this later to make sure the updated post isnt moved to the front
            })
          }
          else {
            this.setState({
              collFeed: this.state.collFeed.filter(post => {
                if (post._id !== data._id) return true;
                return false;
              })
            })
          }
          // Saved for history to see if this is viable- trying to nested filter or double filter in a for each. 
          //decided to use the same method as the submit, dont know why i didnt think of it before

          // forEach(el => {
          //   // if (post){
          //   console.log("el", el, "post", post, "entry", entry)
          //   el.entries.filter(entry => {
          //     if (entry._id !== data._id) return true;
          //     return false;
          //   })
          //   el.filter(entry => {
          //     if (entry._id !== data._id) return true;
          //     return false;
          //   })
          // })
        })
        .catch(err => {
          this.setState({
            error: err.description,
          })
        })
    }

  }

  // this should submit the updated content to the old _id
  // _editHandler(entry) {
  //   console.log(entry)
  //   api
  //     .post('/api/feed/entry/e', entry)
  //     .then(data => {
  //       this.setState({
  //         feed: this.state.feed.filter(el => {
  //           if (el._id !== data._id) return true;
  //           return false;
  //         })
  //       })
  //     })
  //     .catch(err => {
  //       this.setState({
  //         error: err.description,
  //       })
  //     })
  // }
  _handleChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    })
  }
  _handleCollectionSearch(e) {
    console.log(e.target.value)
    this._handleChange(e);


    let collection = e.target.value
    console.log("this.state.collection", collection)
    api.post('/api/feed/entry/c', { collection })
      .then((data) => {
        console.log(data)
        this.setState({
          collectionRes: data,
        })
      })
      .catch(err => {
        console.log(err)
      })

  }

  _handleCollectionUpdate(e) {
    this.setState({
      collection: e.target.innerHTML,
      found: true,
      collectionRes: [],
    })
    // console.log('found?', this.state.found)
  }
  _feedHandler() {
    this.setState({
      unsorted: !this.state.unsorted
    })
  }

  render() {
    if (this.state.loading === true) {
      return <div>loading...</div>
    }
    else {

      return (<div className="container-lite">
        {this.props.profile && <span>This is your personal blog feed. Find all of your posts on this page.</span>}
       {this.props.profile !== true && <span> These are the Stories babay! Jounal or create stories here. Let other people interact with them, make them their own.&nbsp;
        Understand that all of our stories come from a common origin. &nbsp; &nbsp;</span>}
{this.props.user ==null && <i><b>Sign in to post your own story</b></i>}
      <div className="container-lite-blog">
          {this.props.profile!==true && this.props.user && <Blog
            submitHandler={this._submitHandler}
            entry={this.state.entry}
            handleChange={this._handleChange}
            handleCollectionSearch={this._handleCollectionSearch}
            priv={this.state.priv}
            error={this.state.error}
            title={this.state.title}
            genre={this.state.genre}
            user={this.props.user}
            collection={this.state.collection}
            chapter={this.state.chapter}
            collectionCheck={this.state.collectionCheck}
            collectionRes={this.state.collectionRes}
            handleCollectionUpdate={this._handleCollectionUpdate}
          />}

          <Feed profile={this.props.profile}
          feed={this.state.feed}
            collFeed={this.state.collFeed}
            feedHandler={this._feedHandler}
            deleteHandler={this._deleteHandler}
            editHandler={this._editHandler}
            user={this.props.user}
            unsorted={this.state.unsorted}
            loading={this.state.loading}
          />
        </div>
      </div>
      );
    }
  }
}

export default Index;
