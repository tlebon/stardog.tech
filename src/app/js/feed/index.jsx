import React, { Component } from 'react';
import Blog from './Blog'
import Feed from './Feed'
import api from "../utils/api"

class Index extends Component {
  constructor(props) {
    super(props)

    this.state = {
      blog: '',
      priv: false,
      feed: [],
      error: ""
    }
    this._submitHandler = this._submitHandler.bind(this);
    this._handleBlog = this._handleBlog.bind(this);
    this._deleteHandler = this._deleteHandler.bind(this);
    this._handleCheck = this._handleCheck.bind(this);
  }

  componentDidMount() {
    api
      .get(`/api/feed/feed`)
      .then(data => {
        this.setState({
          feed: data,
          loading: false
        })
      })
  }

  _submitHandler(blog,priv) {
    if (this.state.blog==='')return;
    api
      .post('/api/feed/blog', {blog, priv})
      .then(data => {
        this.setState({
          feed: [data,...this.state.feed],  
          error: "",
          blog:''
        });
        // console.log(this.state.feed)
      })
      .catch(err => {
        this.setState({
          error: err.description,
          blog:""
        })
      })
  }

  _deleteHandler(blog){
    console.log(blog)
    api
    .post('/api/feed/delete',blog)
    .then(data=>{
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
  _handleBlog(value){
    this.setState({
      blog:value
    })
  }

  _handleCheck(e){
    this.setState({
      priv:e.target.checked
    })
  }
  render() {
    return (
      <div className="container-lite">
      This is the Blog babay! Jounal or create stories here. Let other people interact with them, make them their own. <br/>
      Understand that all of our stories come from a common origin.
        {this.props.user && <Blog 
        submitHandler={this._submitHandler} 
        value={this.state.blog} 
        handleBlog={this._handleBlog} 
        handleCheck={this._handleCheck}
        priv={this.state.priv}
        user={this.props.user}
        />}
        <hr />
        <Feed feed={this.state.feed} deleteHandler={this._deleteHandler}
        user={this.props.user}
        />
      </div>
    );
  }
}

export default Index;