import React from 'react';
const moment = require("moment");

const Unsorted = (props) => {
  let feed = props.feed.map(post => {
    // console.log(post.email , props.user)
    if (post.private === false || (props.user && post.private === true && props.user.email === post.email)) {
      return (
        <div key={post._id}>
            {post.title} &nbsp;&nbsp;
        {moment(post.created_at).fromNow()}
            &nbsp; by {post.email}
            <br />
            <span>
              {post.entry}
            </span>&nbsp;&nbsp;
      <br /> <button>{post.type}</button>&nbsp;&nbsp;
        {props.user && props.user.email === post.email && <button onClick={e => props.deleteHandler(post)}>Delete</button>}
            &nbsp;&nbsp;
        {props.user && props.user.email === post.email && <button style={{ color: "yellow" }} onClick={e => props.editHandler(post)}>Edit</button>}
            <hr />
          </div>
        );
      }
      else return;
    })
    if (props.loading==true) return (<div>Loading...</div>)
    else{return (<div>
      {feed}
    </div>)
    }
};

export default Unsorted;