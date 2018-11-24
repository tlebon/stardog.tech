import React, { Component } from 'react';
import Blog from './Blog'
import Feed from './Feed'
import api from "../utils/api"

class Index extends Component {
  constructor(props) {
    super(props)

    this.state = {
      entry: '',
      priv: false,
      feed: [],
      title:"",
      genre:"Unsorted",
      error: ""
    }
    this._submitHandler = this._submitHandler.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._deleteHandler = this._deleteHandler.bind(this);
    // this._handleCheck = this._handleCheck.bind(this);
  }

  componentDidMount() {
    api
      .get(`/api/feed/`)
      .then(data => {
        this.setState({
          feed: data,
          loading: false
        })
      })
  }

  _submitHandler(entry,priv,title,genre) {
    if (this.state.entry==='')return;
    api
      .post('/api/feed/entry', {entry,priv,title,genre})
      .then(data => {
        this.setState({
          feed: [data,...this.state.feed],  
          error: "",
          entry:'',
          priv:false,
          title:"",
          genre:"Unsorted",
        });
        // console.log(this.state.feed)
      })
      .catch(err => {
        this.setState({
          error: err.description,
          entry:""
        })
      })
  }

  _deleteHandler(entry){
    console.log(entry)
    api
    .post('/api/feed/entry/d',entry)
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
  _handleChange(e){
    const target = e.target;
    const value = target.type === "checkbox"? target.checked:target.value;
    const name = target.name;
    this.setState({
      [name]:value
    })
  }

  // _handleCheck(e){
  //   this.setState({
  //     priv:e.target.checked
  //   })
  // }
  render() {
    return (
      <div className="container-lite">
      This is the Stories babay! Jounal or create stories here. Let other people interact with them, make them their own. &nbsp; &nbsp;
      Understand that all of our stories come from a common origin.
        {this.props.user && <Blog 
        submitHandler={this._submitHandler} 
        value={this.state.entry} 
        handleChange={this._handleChange} 
        priv={this.state.priv}
        title={this.state.title}
        genre={this.state.genre}
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