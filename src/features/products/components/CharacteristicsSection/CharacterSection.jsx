import React, { useState,useEffect } from 'react';
import { useCharacterItemDetailsQuery } from '../../../../services/characteristicApi';
import CharacterButtons from './CharacterButtons';

function CharacterSection({ characteristics, }) {
  const [allChars,setAllChars]=useState(characteristics)
  const [charBtns, setCharBtns] = useState([]);

  const handleSelectChange = (e) => {
    const check=charBtns.some(item=>item.charId===e.target.value)
    if(check) return;

    const newCharBtn = {
      charTitle: e.target.selectedOptions[0].label,
      charId: e.target.value,
      id: charBtns.length + 1,
    };
    setCharBtns([...charBtns, newCharBtn]);
    // console.log(e.target.value)
    // setAllChars(allChars.filter(item=>item.id!==Number(e.target.value)))
  };
  const deleteCharacterBtn=id=>{
    setCharBtns(charBtns.filter(item=>item.id!==id))
    
  }
  

  return (
    <div className="mb-6 w-2/3">
      <h2 className="text-base my-3 font-semibold uppercase">
        Выбор характеристик
      </h2>
      <CharacterButtons deleteCharacterBtn={deleteCharacterBtn} charBtns={charBtns} />
      <div className="flex items-center gap-4 ">
        <select
          onChange={handleSelectChange}
          name="characteristics"
          className="w-1/2 border-2 cursor-pointer border-inherit p-2 text-base outline-0"
          placeholder="Выбрать категорию"
          data-te-select-init
          data-te-select-visible-options="3"
        >
          <option value="" disabled>
            Add Character
          </option>
          {allChars?.map((item) => (
            <option
              className="cursor-pointer"
              label={item.title}
              key={item.id}
              value={item.id}
            >
              {item.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default CharacterSection;
