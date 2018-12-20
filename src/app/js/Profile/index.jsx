import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Feed from '../feed/Feed'
import api from "../utils/api"
import {_feedHandler} from "../feed/index"

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            feed: [],
            collFeed: [],
            loading: true,
            unsorted: true
        }
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
    render() {
        if (this.state.loading) return <div>Loading..</div>
        if (!this.props.user) return <Redirect to="/auth/sign-in" /> // this is actually the protection

        return (<div className="profile-page container-lite">
            <div className="profile-personal">
                <img src={this.props.user.profilePicture} alt="profile" width="50%" />
                <br />
                {this.props.user._id}
                <br />
                {this.props.user.email}
            </div>
            <Feed feed={this.state.feed}
            collFeed={this.state.collFeed}
            // feedHandler={this._feedHandler}
         //   deleteHandler={this._deleteHandler}
          //  editHandler={this._editHandler} 
            user={this.props.user}
            unsorted={this.state.unsorted}
            loading={this.state.loading}/>
        </div>
        )
    }
}

export default Profile
