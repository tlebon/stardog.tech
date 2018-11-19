import React from 'react'
import Doggie from '../assets/doggie.jpg'

const Home = props => {
    return (
        <div className="container-dark">
            <h1>Hello {props.user ? props.user.email : 'Poochie'}, welcome to Stardog.tech.</h1>
           <h2> This is my website! I am building it to learn more about React and web development</h2> 
            <br />
            I dont know where it will go, but please feel free to join me on my journey. 
            <br />
            I apologize if it is broken or weird. It is a work in progress.
            <br />
            {/* <img src={Doggie} alt="doggie" width="40%" /> */}
        {/* <div className="earth"></div> */}
        <div className="stars">
        </div>
        </div>
    )
}

export default Home
