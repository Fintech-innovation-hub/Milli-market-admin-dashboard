import React, { useRef } from 'react';
import JoditEditor from 'jodit-react';

const config = {
  buttons: ['bold', 'italic', 'link', 'unlink', 'underline', 'source'],
};

const Editor = ({ initialValue, getValue, updateProductTitleFormValue }) => {
  const editor = useRef(null);

  return (
    <JoditEditor
      ref={editor}
      value={initialValue}
      config={config}
      tabIndex={1}
      //   onBlur={(newContent) => getValue(newContent)}
      onChange={(newContent) =>
        updateProductTitleFormValue(initialValue, newContent)
      }
    />
  );
};

export default Editor;
