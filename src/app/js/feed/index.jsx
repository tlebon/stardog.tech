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

  _submitHandler(entry, priv, title, genre, collection, chapter) {
    if (this.state.entry === '') return;
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
            collFeed: this.state.collFeed.filter(item=>{
              if (data._id!==item._id) return true;
              return false;
            }).concat(data),
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

  _deleteHandler(entry) {
    console.log(entry)
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
    this._handleChange(e);
    if (this.state.collection === '') return;
    else {
      let value = e.target.value
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
        This is the Stories babay! Jounal or create stories here. Let other people interact with them, make them their own. &nbsp; &nbsp;
        Understand that all of our stories come from a common origin.

      <div className="container-lite-blog">
          {this.props.user && <Blog
            submitHandler={this._submitHandler}
            entry={this.state.entry}
            handleChange={this._handleChange}
            handleCollectionSearch={this._handleCollectionSearch}
            priv={this.state.priv}
            title={this.state.title}
            genre={this.state.genre}
            user={this.props.user}
            collection={this.state.collection}
            chapter={this.state.chapter}
            collectionCheck={this.state.collectionCheck}
            collectionRes={this.state.collectionRes}
            handleCollectionUpdate={this._handleCollectionUpdate}
          />}

          <Feed feed={this.state.feed}
            collFeed={this.state.collFeed}
            feedHandler={this._feedHandler}
            deleteHandler={this._deleteHandler}
            editHandler={this._editHandler}
            user={this.props.user}
            unsorted={this.state.unsorted}
          />
        </div>
      </div>
      );
    }
  }
}

export default Index;