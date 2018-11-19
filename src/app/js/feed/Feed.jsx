import React from 'react';

const Feed = (props) => {
  let feed = props.feed.map( post => {
    // console.log(post.email , props.user)
    if (post.private===false || (props.user && post.private===true && props.user.email===post.email)){
      return (
        <div key={post._id}>
        {post.created_at}
        <h4>{post.email}</h4>
        <br />
        <span>
          {post.blog}
        </span>
        {props.user && props.user.email===post.email && <button onClick={e=>props.deleteHandler(post)}>Delete</button>}
        <hr />
      </div>
    );
  }
  else return;
  })
  if(props.user){
  return (
    <div className="feed">
        
      {feed}
    </div>
  )
}
else{
  return(
    <div className="feed"style={{height:80+"vh"}}>
      {feed}
    </div>
  )
}
};

export default Feed;