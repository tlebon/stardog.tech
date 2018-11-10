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
  render() {
    return (
      <div>
        <Blog />
        <Feed />
      </div>
    );
  }
}

export default Index;