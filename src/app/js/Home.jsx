import React from 'react'
import Doggie from '../assets/doggie.jpg'

const Home = props => {
    return (
        <div className="container">
            <h1>Hello, {props.user ? props.user.email : 'Stranger'}!</h1>
            <img src={Doggie} alt="doggie" width="50%"/>
        </div>
    )
}

export default Home
