import React from 'react';
const moment = require("moment");
import Blog from './Blog'
import Pencil from '../../assets/pencil-button.png'

const Collection = (props) => {
  let feed = props.collFeed.map(post => {
    let entry = post.entries.map(entry => {
      if (props.edit == entry._id) {
        return (<div className="edit-field" key={entry._id}><Blog
          entry={props.editEntry || entry.entry}
          handleChange={props.handleChange}
          editHandler={props.editHandler}
          edit={props.edit}
          handleCollectionSearch={props.handleCollectionSearch}
          priv={props.editPriv}
          error={props.error}
          found={props.editFound}
          title={props.editTitle || entry.title}
          genre={props.editGenre || entry.genre}
          user={props.user}
          collection={props.editCollection || post.coll}
          chapter={props.editChapter || entry.chapter}
          collectionCheck={props.editCollectionCheck}
          submitHandler={props.editSubmitHandler}
          collectionRes={props.editCollectionRes}
          handleCollectionUpdate={props.handleCollectionUpdate} />  </div>)
      }
      return (
        <div key={entry._id}>
          {entry.chapter} "{entry.title}"
          <br />
          {entry.entry}
          <br /> <button>{entry.type}</button>&nbsp;&nbsp;
          {props.user && props.user.email === post.email && post.private && <button style={{ color: "orange" }}>Private</button>}
          {props.user && props.user.email === post.email && <button onClick={e => props.deleteHandler(entry, post)}>Delete</button>}
          &nbsp;&nbsp;
        {props.user && props.user.email === post.email && <button style={{ color: "yellow" }} onClick={e => props.editHandler(entry._id)}>Edit</button>}
          <hr />
        </div>
      )
    })
    //edits the collection title
    if (props.edit == post._id) {
      return (
        <div key={post._id}>
          <input className="title-field"
            name="collection"
            value={props.editCollection || post.coll}
            onChange={e => props.handleChange(e)}></input>&nbsp;
         {props.user && props.user.email === post.email && <a onClick={e => props.editTitleSubmitHandler(post._id, props.editCollection)}><img src={Pencil} className="edit-pencil" /></a>}
          &nbsp;&nbsp;{props.user && props.user.email === post.email && <a onClick={e => props.editHandler(null)} style={{ color: "#6378F2" }}>X</a>}
          <br />
          by {post.email}&nbsp; &nbsp;
      {moment(post.updated_at).fromNow()}
          <br />
          {entry}
          {/* <br /> <button>{entry.type}</button>&nbsp;&nbsp; */}
          {props.user && props.user.email === post.email && <button onClick={e => props.deleteHandler(post)}>Delete Collection</button>}
          {/* {props.user && props.user.email === post.email && <div>&nbsp;&nbsp;</div>} */}
          {/* {props.user && props.user.email === post.email && <button style={{ color: "yellow" }} onClick={e => props.editHandler(post)}>Edit</button>} */}
          {props.user && props.user.email === post.email && <div><hr /></div>}</div>
      )
    }
    if ((props.profile && post.email == props.user.email) || props.profile == null) {
      return (
        <div key={post._id}>
          <h3 className="coll-title">{post.coll} &nbsp;
         {props.user && props.user.email === post.email && <a onClick={e => props.editHandler(post._id)}><img src={Pencil} className="edit-pencil" /></a>}</h3>
          by {post.email}&nbsp; &nbsp;
      {moment(post.updated_at).fromNow()}
          <br />
          {entry}
          {/* <br /> <button>{entry.type}</button>&nbsp;&nbsp; */}
          {props.user && props.user.email === post.email && <button onClick={e => props.deleteHandler(post)}>Delete Collection</button>}
          {/* {props.user && props.user.email === post.email && <div>&nbsp;&nbsp;</div>} */}
          {/* {props.user && props.user.email === post.email && <button style={{ color: "yellow" }} onClick={e => props.editHandler(post)}>Edit</button>} */}
          {props.user && props.user.email === post.email && <div><hr /></div>}</div>
      )
    }
    else return
  });


  return (<div className="feed-content">
    {feed}
  </div>)
}
export default Collection;