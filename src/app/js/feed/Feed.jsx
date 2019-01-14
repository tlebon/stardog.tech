import React from 'react';
import Collection from './Collection'
import Unsorted from './Unsorted'



const Feed = (props) => {
  if (props.unsorted) {
    return (
      <div className="feed">
        <div className="blog-header">
          <span>unsorted
  </span>
          &nbsp; ||&nbsp;
          <span onClick={e => props.feedHandler()}>collections
  </span>
        </div>
        <Unsorted profile={props.profile}
          feed={props.feed}
          edit={props.edit}
          feedHandler={props.feedHandler}
          deleteHandler={props.deleteHandler}
          editHandler={props.editHandler}
          editSubmitHandler={props.editSubmitHandler}
          user={props.user}
          unsorted={props.unsorted}
          //edit button states
          handleChange={props.handleChange}
          handleCollectionSearch={props.handleCollectionSearch}
          editEntry={props.editEntry}
          editPriv={props.editPriv}
          error={props.error}
          editFound={props.editFound}
          editTitle={props.editTitle}
          editGenre={props.editGenre}
          editCollection={props.editCollection}
          editChapter={props.editChapter}
          editCollectionCheck={props.editCollectionCheck}
          editCollectionRes={props.editCollectionRes}
          handleCollectionUpdate={props.handleCollectionUpdate}
        />
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
        <Collection profile={props.profile}
          collFeed={props.collFeed}
          deleteHandler={props.deleteHandler}
          editHandler={props.editHandler}
          edit={props.edit}
          editSubmitHandler={props.editSubmitHandler}
          user={props.user}
          unsorted={props.unsorted} 
            //edit button states
            handleChange={props.handleChange}
          handleCollectionSearch={props.handleCollectionSearch}
          editEntry={props.editEntry}
          editPriv={props.editPriv}
          error={props.error}
          editFound={props.editFound}
          editTitle={props.editTitle}
          editGenre={props.editGenre}
          editCollection={props.editCollection}
          editChapter={props.editChapter}
          editCollectionCheck={props.editCollectionCheck}
          editCollectionRes={props.editCollectionRes}
          handleCollectionUpdate={props.handleCollectionUpdate}
          />
      </div>
    )
  }
};

export default Feed;