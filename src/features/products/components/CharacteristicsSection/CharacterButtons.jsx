import React from 'react';
import { useSelector } from 'react-redux';

import CharacterBtn from './CharacterBtn';

function CharacterButtons({characters}) {
  const chosenCharacteristics = useSelector(
    (state) => state.product.chosenCharacteristics
  );

  return (
    <div className="w-full my-6  flex flex-col items-start gap-6">
      {chosenCharacteristics.map((elem) => (
        <CharacterBtn key={elem.charId} {...elem} />
      ))}
    </div>
  );
}

export default CharacterButtons;
