import React from 'react';

function AttributeInput({ labelTitle, name, id }) {
  return (
    <label className=" flex flex-col gap-1 items-start" htmlFor={labelTitle}>
      <span className={'label-text text-base-content font-bold '}>
        {labelTitle}
      </span>
      <input
        className="border border-solid border-gray-400 rounded p-2 outline-none  input-bordered w-full  "
        type="text"
        name={name}
        placeholder={labelTitle}
      />
    </label>
  );
}

export default AttributeInput;
