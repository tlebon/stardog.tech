import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
// import Feed from '../feed/Feed'
import api from "../utils/api"
import Index from "../feed/index"

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
         profile: true
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
componentWillUnmount(){
    this.setState({profile:false})
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
            </div><div className="profile-blog">
            <Index user={this.props.user} profile={this.state.profile}/>
        </div>
        </div>
        )
    }
}

export default Profile
