import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsFillTrashFill } from 'react-icons/bs';
import { openModal } from '../../../common/modalSlice';

import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from '../../../../utils/globalConstantUtil';

function CharacterBtn({ id, charId, charTitle, deleteCharacterBtn }) {
  const dispatch = useDispatch();
  const allChars = useSelector((state) => state.product.characteristics);
  const chosenItem = allChars.find(
    (item) => Number(item.parent_id) === Number(charId)
  );
  console.log(charId);
  console.log(chosenItem);
  console.log(allChars);
  const showCharacterItems = () => {
    console.log(charId);
    dispatch(
      openModal({
        title: 'Choose Characteristics',
        extraObject: { charId: charId },
        bodyType: MODAL_BODY_TYPES.SELECT_CHARACTER_ITEMS,
      })
    );
  };
  return (
    <div className="w-full flex items-center justify-between">
      <div className="w-2/3 flex items-center gap-4">
        <button
          onClick={showCharacterItems}
          className="p-2 border border-opacity-60 border-red-500 cursor-pointer w-2/3 flex justify-start rounded items-center"
        >
          {charTitle}
        </button>
        <div className='flex items-center gap-3'>
          {chosenItem?.values?.map((item, index) => (
            <div className="px-2 py-1 flex items-center gap-2 w-16 justify-between bg-slate-200 rounded-3xl">
              <span>{item}</span>
              <button className='bg-red-500 rounded-full  h-6 w-6 text-white'>X</button>
            </div>
          ))}
        </div>
      </div>
      <button onClick={() => deleteCharacterBtn(id)}>
        <BsFillTrashFill className="text-lg text-red-600" />
      </button>
    </div>
  );
}

export default CharacterBtn;
