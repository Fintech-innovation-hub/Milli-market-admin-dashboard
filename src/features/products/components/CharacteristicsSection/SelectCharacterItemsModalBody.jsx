import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCharacterItemDetailsQuery } from '../../../../services/characteristicApi';
import { addNewCharacteristic } from '../../productSlice';
import CharacterItemsList from './CharacterItemsList';

function SelectCharacterItemsModalBody({ closeModal, extraObject, size }) {
  const [items, setItems] = useState({});
  const dispatch = useDispatch();
  const {
    data: characterItems,
    isSuccess,
    isLoading,
  } = useCharacterItemDetailsQuery(extraObject?.charId);

  const chooseCharHandler = () => {
    console.log(items)
    dispatch(addNewCharacteristic(items))
    closeModal()
  };

  return (
    <div className=" p-3 ">
      {isLoading && <h2 className="text-center font-bold">Loading...</h2>}
      {isSuccess && (
        <CharacterItemsList
          setItems={setItems}
          charId={extraObject.charId}
          characterItems={characterItems?.data}
        />
      )}

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
