import React from 'react';
import Collection from './Collection'
import Unsorted from './Unsorted'
const moment = require("moment");


const Feed = (props) => {
  if (props.user && props.unsorted) {
    return (
      <div className="feed">
        <div className="navigation container-dark"> 
          <span onClick={e => props.feedHandler()}>collections
  </span>&nbsp;
  <span onClick={e => props.feedHandler()}>unsorted
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
  else if (props.user && props.unsorted === false) {
    return (
      <div className="feed">
        <div className="navigation container-dark">
          <span onClick={e => props.feedHandler()}>collections
  </span>&nbsp;
  <span onClick={e => props.feedHandler()}>unsorted
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
  else {
    return (
      <div className="feed" style={{ height: 80 + "vh" }}>
        <Unsorted
          feed={props.feed}
          feedHandler={props.feedHandler} />
      </div>
    )
  }
};

export default Feed;