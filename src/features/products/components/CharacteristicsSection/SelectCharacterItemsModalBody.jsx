import { useDispatch, useSelector } from 'react-redux';
import { addChosenValuesToCharacter } from '../../productSlice';
import CharacterItemsList from './CharacterItemsList';

function SelectCharacterItemsModalBody({ closeModal, extraObject, size }) {
  const allCharItems = useSelector((state) => state.character.allCharItems);
  const dispatch = useDispatch();
  const chooseCharHandler = () => {
    const filteredCharItems = allCharItems.filter((item) => item.checked);
    dispatch(
      addChosenValuesToCharacter({
        id: extraObject.charId,
        values: filteredCharItems,
      })
    );
    closeModal();
  };

  return (
    <div className=" p-3 ">
      <CharacterItemsList />
      <div className="w-full p-3 flex items-center justify-between ">
        <button onClick={() => closeModal()} className=" text-black">
          Close
        </button>
        <button
          onClick={chooseCharHandler}
          className="bg-red-600  rounded px-3 py-2 text-white font-bolder"
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default SelectCharacterItemsModalBody;
