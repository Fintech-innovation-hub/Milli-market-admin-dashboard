import React, { useRef } from 'react';
import JoditEditor from 'jodit-react';

const config = {
  buttons: [
    'bold',
    'italic',
    'unlink',
    'underline',
    'source',
    'link',
    'image',
    'video',
  ],
};

const Editor = ({
  initialValue,
  getValue,
  updateProductTitleFormValue,
  setDess,
}) => {
  const editor = useRef(null);

  return (
    <JoditEditor
      ref={editor}
      value={initialValue}
      config={config}
      tabIndex={1}
       
      onChange={(newContent) => {
        setDess(newContent);
        // updateProductTitleFormValue(initialValue, newContent);
      }}
    />
  );
};

export default Editor;
