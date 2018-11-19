import React from 'react';

const Blog = (props) => {
  return (
    <div >
      <textarea className="blog-field" 
      placeholder="Tell me a Fable.." 
      value={props.value} 
      onChange={e=>props.handleBlog(e.target.value)}></textarea>
       &nbsp; &nbsp; <input className="checkbox" type="checkbox" name="priv" checked={props.priv} onChange={e=>props.handleCheck(e)}/> Private?  &nbsp; &nbsp; 
      <button onClick={()=>props.submitHandler(props.value, props.priv)}>Let it be Done</button>
    </div>
  );
};

export default Blog;