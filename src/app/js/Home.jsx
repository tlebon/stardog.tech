import React from 'react'
import Doggie from '../assets/doggie.jpg'

const Home = props => {
    return (
        <div className="container">
            <h1>Hello, {props.user ? props.user.email : 'Poochie'}, welcome to Stardog.tech.</h1>
           <h2> Using technology to improve your life and the world.</h2> 
            <br />
        <div className="stars earth">
            <img src={Doggie} alt="doggie" width="50%"/>
        </div></div>
    )
}

export default Home
