import React, { Component } from 'react';
import Blog from './Blog'
import Feed from './Feed'

class Index extends Component {
  constructor(props) {
    super(props)

    this.state = {
      blog: '',
      feed: [],
      error:""
    }
    this.submitHandler=this.submitHandler.bind(this);

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

  submitHandler() {
    api
      .post('/api/feed/blog', { blog })
      .then(data => {
        this.setState({
          feed:[...data,this.state.blog],
          error:""
        });
       })
       .catch(err =>{
         this.setState({
           error:err.description
         })
       })
  }
  render() {
    return (
      <div className="container-lite">
        {this.props.user && <Blog onClick={this.submitHandler} />}
        <hr />
        <Feed feed={this.state.feed}/>
      </div>
    );
  }
}

export default Index;