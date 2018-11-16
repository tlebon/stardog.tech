import React from 'react';

const Feed = (props) => {
  let feed = props.feed.map( post => {
    return (
      <div key={post._id}>
        {post.created_at}
        <h4>{post.email}</h4>
        <br />
        <b>
          {post.blog}
        </b>
        <hr />
      </div>
    );
  })
  return (
    <div className="feed">
      {feed}
    </div>
  )
};

export default Feed;