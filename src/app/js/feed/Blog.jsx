import React from 'react';

const Blog = (props) => {
  return (
    <div >
      This is the Blog babay! Jounal or create stories here. Let other people interact with them, make them their own. <br/>
      Understand that all of our stories come from a common origin.
      <br />
      <br />
      <textarea className="blog-field" placeholder="Tell me a Fable.." value={props.blog} ></textarea> &nbsp;
      <button onClick={submitHandler}>Let it be Done</button>
    </div>
  );
};

export default Blog;