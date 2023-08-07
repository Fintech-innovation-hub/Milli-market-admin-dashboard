import React, { useState } from 'react';
import { useCharacterItemDetailsQuery } from '../../../services/characteristicApi';

function CharacterSection({ characteristics, setAllCharacters }) {

  const [chrs,setChrs]=useState([])
  const [character, setCharacter] = useState(1);
  const [showCharacterItems, setShowCharacterItems] = useState(false);
  const { data: characterItems, isSuccess: isSuccessCharacterItem } =
    useCharacterItemDetailsQuery(character);
  const [characterIds, setCharacterIds] = useState([]);

  const addCharacter = () => {
    const obj = { id: character, values: characterIds };
    console.log(obj);
    setAllCharacters((p) => [...p, obj]);
    setShowCharacterItems(false);
  };

  return (
    <div className="mb-6 w-2/3">
      <h2 className="text-base my-3 font-semibold uppercase">
        Выбор характеристик
      </h2>
      <div className="flex items-center gap-4">
        <select
          onChange={(e) => {
            setCharacter(e.target.value);
            setShowCharacterItems(true);
          }}
          name="characteristics"
          className="w-[200px] border-2 border-inherit p-2 text-base outline-0"
          placeholder="Выбрать категорию"
          data-te-select-init
          data-te-select-visible-options="3"
        >
          {characteristics?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>
        {showCharacterItems && (
          <div>
            {isSuccessCharacterItem && (
              <div className="flex items-center  gap-4">
                {characterItems?.data?.map((item) => (
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
                ))}
                <button
                  onClick={addCharacter}
                  className="bg-red-600 text-white rounded p-2 cursor-pointer"
                >
                  add
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CharacterSection;
