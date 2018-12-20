import React from 'react';
import Collection from './Collection'
import Unsorted from './Unsorted'



const Feed = (props) => {
  if ( props.unsorted) {
    return (
      <div className="feed">
        <div className="blog-header">
          <span>unsorted
  </span>
          &nbsp; ||&nbsp;
          <span onClick={e => props.feedHandler()}>collections
  </span>
        </div>
        <Unsorted feed={props.feed}
          feedHandler={props.feedHandler}
          deleteHandler={props.deleteHandler}
          editHandler={props.editHandler}
          user={props.user}
          unsorted={props.unsorted} />
      </div>
    )
  }
  else if (props.unsorted === false) {
    return (
      <div className="feed">
        <div className="blog-header">
          <span onClick={e => props.feedHandler()}>unsorted
  </span>
          &nbsp; ||&nbsp;
          <span>collections
  </span>
        </div>
        <Collection collFeed={props.collFeed}
          deleteHandler={props.deleteHandler}
          editHandler={props.editHandler}
          user={props.user}
          unsorted={props.unsorted} />
      </div>
    )
  }
};

export default Feed;