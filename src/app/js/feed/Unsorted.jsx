import React from 'react';
const moment = require("moment");
import Blog from './Blog'

const Unsorted = (props) => {
  let feed = props.feed.map(post => {
    // console.log(post.email , props.user)
    if (props.edit == post._id) {
      return (<div className="edit-field" key={post._id}><Blog 
        entry={props.editEntry || post.entry}
        handleChange={props.handleChange}
        editHandler={props.editHandler}
        edit={props.edit}
        handleCollectionSearch={props.handleCollectionSearch}
        priv={props.editPriv}
        error={props.error}
        found={props.editFound}
        title={props.editTitle || post.title}
        genre={props.editGenre || post.genre}
        user={props.user}
        collection={props.editCollection}
        chapter={props.editChapter}
        collectionCheck={props.editCollectionCheck}
        submitHandler={props.editSubmitHandler}
        collectionRes={props.editCollectionRes}
        handleCollectionUpdate={props.handleCollectionUpdate} />  </div>)
    }
    if ((props.profile && post.email == props.user.email) || props.profile == null) {
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
        {props.user && props.user.email === post.email && <button style={{ color: "yellow" }} onClick={e => props.editHandler(post._id)}>Edit</button>}
            <hr />
          </div>
        );
      }
      else return;
    }
  })
  if (props.loading == true) return (<div>Loading...</div>)
  else {
    return (<div>
      {feed}
    </div>)
  }
};

export default Unsorted;