import React from 'react';

const Blog = (props) => {
  return (
    <div >
      <input className="title-field"
        type="text"
        name="title"
        value={props.title}
        placeholder="What shall we call it?"
        onChange={e => props.handleChange(e)}></input>
      <textarea className="blog-field"
        placeholder="Tell me a Fable.."
        name="entry"
        value={props.entry}
        onChange={e => props.handleChange(e)}></textarea>
      &nbsp; &nbsp;
       <input className="checkbox"
        type="checkbox"
        name="priv"
        checked={props.priv}
        onChange={e => props.handleChange(e)} />
      Private?  &nbsp; &nbsp;
         <label>
        Pick a Genre:
        <select name="genre" value={props.genre} onChange={e => props.handleChange(e)}>
          <option value="Unsorted">Unsorted</option>
          <option value="Fiction">Fiction</option>
          <option value="Blog">Blog</option>
          <option value="Sci/fan">Sci-fi/Fantasy</option>
          <option value="News">News/Informative</option>
        </select>
      </label>
      <input className="checkbox" 
        type="checkbox"
        name="collectionCheck"
        checked={props.collectionCheck}
        onChange={e => props.handleChange(e)} />
      Part of a Collection? &nbsp; &nbsp;
     {props.collectionCheck && <input className="coll-field"
        type="text"
        name="collection"
        value={props.collection}
        placeholder="Which one?"
        onChange={e => props.handleChange(e)}></input>}
        {props.collectionCheck && <input className="coll-field"
        type="number"
        name="chapter"
        value={props.chapter}
        placeholder="What Chapter?"
        onChange={e => props.handleChange(e)}></input>}
      <button onClick={() => props.submitHandler(props.entry, props.priv, props.title, props.type, props.collection,props.chapter)}>Let it be Done</button>
    </div>
  );
};

export default Blog;