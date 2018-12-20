import React from 'react'

const Home = props => {
    return (
        <div className="container-dark">
            <h1>Hello {props.user ? props.user.email : 'Poochie'}, welcome to Stardog.tech.</h1>
           <h2> This is my website! I am building it to learn more about React and web development</h2> 
            <br />
            I dont know where it will go, but please feel free to join me on my journey. 
            <br />
            The Blog feature is now <b>mostly</b> working! Come check it out, post a story or a journal.
            <br />
            {/* <img src={Doggie} alt="doggie" width="40%" /> */}
        {/* <div className="earth"></div> */}
        <div className="stars">
        </div>
        </div>
    )
}

export default Home
