import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BsFillTrashFill } from 'react-icons/bs';
import { openModal } from '../../../common/modalSlice';
import { deleteCharacter, deleteCharacterItem } from '../../productSlice';
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from '../../../../utils/globalConstantUtil';
import { addNewCharItems, deleteCharItem } from './characterSlice';

function CharacterBtn({ charId, charTitle, values, chosenValues }) {
  const dispatch = useDispatch();

  const showCharacterItems = () => {
    dispatch(
      openModal({
        title: 'Choose Characteristics',
        extraObject: { charId, values },
        bodyType: MODAL_BODY_TYPES.SELECT_CHARACTER_ITEMS,
      })
    );
  };
  const deleteCharacterHandler = () => {
    dispatch(deleteCharacter(charId));
  };
  const deleteItem = (id) => {
    dispatch(deleteCharacterItem(id));
    dispatch(deleteCharItem({id}))
  };
  useEffect(() => {
    dispatch(
      addNewCharItems(
        values.map((item) => {
          return { ...item, checked: false };
        })
      )
    );
  }, []);
  return (
    <div className="w-full flex items-center justify-between">
      <div className="w-2/3 flex items-center gap-4">
        <button
          onClick={showCharacterItems}
          className="p-2 border border-opacity-60 border-red-500 cursor-pointer w-2/3 flex justify-start rounded items-center"
        >
          {charTitle}
        </button>
        <div className="flex items-center gap-3">
          {chosenValues?.map((item, index) => (
            <div
              key={item.id}
              className="px-2 py-1 flex items-center gap-2  justify-between bg-slate-200 rounded-3xl"
            >
              <span>{item.title}</span>
              <button
                onClick={() => deleteItem(item.id)}
                className="bg-red-500 rounded-full  h-6 w-6 text-white"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
      <button onClick={deleteCharacterHandler}>
        <BsFillTrashFill className="text-lg text-red-600" />
      </button>
    </div>
  );
}

export default CharacterBtn;
