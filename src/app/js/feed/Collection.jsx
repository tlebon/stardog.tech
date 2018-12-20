import React from 'react';
const moment = require("moment");

const Collection = (props) => {
  let feed = props.collFeed.map(post => {
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
   if((props.profile && post.email==props.user.email) || props.profile==null){ return (
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
   }
   else return
  });
  

  return (<div>
    {feed}
  </div>)
}
export default Collection;