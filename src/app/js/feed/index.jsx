import React, { Component } from 'react';
import Blog from './Blog'
import Feed from './Feed'

class Index extends Component {
  constructor(props) {
    super(props)

    this.state = {
      blog: ''
    }
  }
  submitHandler(){
    
  }
  render() {
    return (
      <div className="container-lite">
       {this.props.user && <Blog /> }
       <hr />
        <Feed />
      </div>
    );
  }
}

export default Index;