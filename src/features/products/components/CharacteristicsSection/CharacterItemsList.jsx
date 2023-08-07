import React, { useState,useEffect } from 'react';

function CharacterItemsList({ characterItems,setItems,charId }) {
  const [allCharItems, setAllCharItems] = useState(
    characterItems.map((item) => {
      return { ...item, checked: false };
    })
  );
  const checkHandler = (e, id) => {
    const allchecked=allCharItems.map(elem=>{
      return elem.id===Number(id) ? {...elem,checked:e.target.checked}: elem
    })
    // console.log(allchecked);
    setAllCharItems(allchecked)
  };
  
  useEffect(() => {
    const values=allCharItems.filter(item=>item.checked).map(elem=>elem.id)
    setItems({parent_id:charId,values:values})
  
  }, [allCharItems])
  

  return (
    <ul>
      {allCharItems?.map((item) => (
        <li
          key={item.id}
          className="border-b-2 p-2  border-slate-600 border-opacity-50"
        >
          <label className="inline-flex items-center">
            <input
              checked={item.checked}
              onChange={(e) => checkHandler(e, item.id)}
              type="checkbox"
              className="w-[20px] h-[20px] cursor-pointer rounded"
            />
            <span className="ml-2 text-black">{item.title}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}

export default CharacterItemsList;
