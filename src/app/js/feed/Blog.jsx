import React from 'react';

const Blog = (props) => {
  return (
    <div className="container">
      This is the Blog babay! Jounal or create stories here. Let other people interact with them, make them their own. <br/>
      Understand that we all share the same stories.
      <br />
      <br />
      <textarea className="blog-field" placeholder="Tell me a Fable.." value={props.blog} ></textarea> &nbsp;
      <button >Let it be Done</button>
    </div>
  );
};

export default Blog;