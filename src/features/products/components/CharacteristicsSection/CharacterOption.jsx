import React from 'react';

function CharacterOption({ id, title, values }) {
  return (
    <option
      className="cursor-pointer"
      data-value={JSON.stringify(values)}
      label={title}
      value={id}
    >
      {title}
    </option>
  );
}

export default CharacterOption;
