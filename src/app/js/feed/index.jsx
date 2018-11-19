import React, { Component } from 'react';
import Blog from './Blog'
import Feed from './Feed'
import api from "../utils/api"

class Index extends Component {
  constructor(props) {
    super(props)

    this.state = {
      blog: '',
      feed: [],
      error: ""
    }
    this._submitHandler = this._submitHandler.bind(this);
    this._handleBlog = this._handleBlog.bind(this);
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

  _submitHandler(blog) {
    api
      .post('/api/feed/blog', { blog })
      .then(data => {
        this.setState({
          feed: [data,...this.state.feed],  
          error: "",
          blog:''
        });
        console.log(this.state.feed)
      })
      .catch(err => {
        this.setState({
          error: err.description,
          blog:""
        })
      })
  }
  _handleBlog(value){
    this.setState({
      blog:value
    })
  }
  render() {
    return (
      <div className="container-lite">
        {this.props.user && <Blog submitHandler={this._submitHandler} value={this.state.blog} handleBlog={this._handleBlog} />}
        <hr />
        <Feed feed={this.state.feed} />
      </div>
    );
  }
}

export default Index;