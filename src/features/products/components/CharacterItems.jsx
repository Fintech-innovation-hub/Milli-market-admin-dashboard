import React from 'react'

function CharacterItems() {
  return (
    <label
    key={item.id}
    htmlFor={item.title}
    className="flex items-center gap-1"
  >
    <input
      onChange={(e) => {
        console.log(e.target.value);
        if (e.target.checked) {
          setCharacterIds([...characterIds, e.target.value]);
        }
      }}
      value={item.id}
      className="p-2 cursor-pointer"
      type="checkbox"
    />
    <span>{item.title}</span>
  </label>
  )
}

export default CharacterItems
