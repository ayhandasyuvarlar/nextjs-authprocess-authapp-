import React, { useState} from "react";
import {marked} from "marked";




const renderer = new marked.Renderer();
renderer.heading = function (text, level) {
  return `<h${level} class="custom-class">${text}</h${level}>`;
};

marked.setOptions({ renderer });

const Mark = () => {
  const [markdown, setMarkdown] = useState(
    "# Welcome to my markdown previewer!\n```js\nconsole.log('Hello World')\n```"
  );

  const handleChange = (event) => {
    setMarkdown(event.target.value);
  };

  return (
    <div>
      <textarea onChange={handleChange} value={markdown} />
      <div dangerouslySetInnerHTML={{ __html: marked(markdown) }} />
    </div>
  );
};

export default Mark;
