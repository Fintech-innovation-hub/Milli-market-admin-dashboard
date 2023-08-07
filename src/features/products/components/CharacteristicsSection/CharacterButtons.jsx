import React from 'react';

import CharacterBtn from './CharacterBtn';

function CharacterButtons({ charBtns, deleteCharacterBtn }) {
  return (
    <div className="w-full my-6  flex flex-col items-start gap-6">
      {charBtns.map((elem) => (
        <CharacterBtn
          deleteCharacterBtn={deleteCharacterBtn}
          key={elem.id}
          {...elem}
        />
      ))}
    </div>
  );
}

export default CharacterButtons;
