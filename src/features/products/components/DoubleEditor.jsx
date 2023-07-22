import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";

const config = {
  buttons: [
    "bold",
    "italic",
    "unlink",
    "underline",
    "source",
    "link",
    "image",
    "video",
  ],
};

const DoubleEditor = ({ initialValue, getValue, textLabel }) => {
  const editor = useRef(null);
  const [deleteAttr, setDeleteAttr] = useState(true);
  const [deleteAttr2, setDeleteAttr2] = useState(true);

  return (
    <>
      {deleteAttr && (
        <div className="">
          <JoditEditor
            ref={editor}
            value={initialValue}
            config={config}
            tabIndex={1}
            //   onBlur={(newContent) => getValue(newContent)}
            onChange={(newContent) => getValue(newContent)}
          />
          <button
            className="btn bg-red-500 px-4 mt-8"
            onClick={() => setDeleteAttr(false)}
          >
            Удалить
          </button>
        </div>
      )}
      {deleteAttr2 && (
        <div className="">
          <h2 className="text-base my-5 font-semibold uppercase">
            {textLabel} на Русском
          </h2>
          <JoditEditor
            ref={editor}
            value={initialValue}
            config={config}
            tabIndex={1}
            //   onBlur={(newContent) => getValue(newContent)}
            onChange={(newContent) => getValue(newContent)}
          />
          <button
            className="btn bg-red-500 px-4 mt-8"
            onClick={() => setDeleteAttr2(false)}
          >
            Удалить
          </button>
        </div>
      )}
    </>
  );
};

export default DoubleEditor;
