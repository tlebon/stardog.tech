import React from 'react';
const moment = require("moment");

const Collection = (props) => {
  let feed = props.collFeed.map(post => {
    // console.log(props.collFeed)
    // if (post.entries.private === false || (props.user && post.entries.private === true && props.user.email === post.email)) {
    // for (let entry of post.entries) {
    let entry = post.entries.map(entry => {
      return (
        <div key={entry._id}>
          "{entry.title}"
          <br />
          {entry.entry}
          <br /> <button>{entry.type}</button>&nbsp;&nbsp;
          {props.user && props.user.email === post.email && <button onClick={e => props.deleteHandler(entry,post)}>Delete</button>}
          &nbsp;&nbsp;
        {props.user && props.user.email === post.email && <button style={{ color: "yellow" }} onClick={e => props.editHandler(entry)}>Edit</button>}
          <hr />
        </div>
      )
    })
    return (
      <div key={post._id}>
        <h3>{post.coll}
        </h3>
        by {post.email}&nbsp; &nbsp;
      {moment(post.created_at).fromNow()}
        <br />
        {entry}
        {/* <br /> <button>{entry.type}</button>&nbsp;&nbsp; */}
        {props.user && props.user.email === post.email && <button onClick={e => props.deleteHandler(post)}>Delete</button>}
        &nbsp;&nbsp;
        {props.user && props.user.email === post.email && <button style={{ color: "yellow" }} onClick={e => props.editHandler(post)}>Edit</button>}
        <hr /></div>
    )
    // }

  });
  // }
  // else return;

  return (<div>
    {feed}
  </div>)
}
export default Collection;