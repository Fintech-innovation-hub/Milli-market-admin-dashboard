import { useDispatch, useSelector } from 'react-redux';
import { addNewCharacteristic } from '../../productSlice';
import CharacterButtons from './CharacterButtons';
import CharacterOption from './CharacterOption';

function CharacterSection({ characteristics }) {
  const dispatch = useDispatch();
  const chosenCharacteristics = useSelector(
    (state) => state.product.chosenCharacteristics
  );
  const handleSelectChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const dataInfo = selectedOption.getAttribute('data-value');
    const check = chosenCharacteristics.some(
      (item) => item.charId === e.target.value
    );
    if (check) return;
    const newCharBtn = {
      charTitle: e.target.selectedOptions[0].label,
      charId: e.target.value,
      values: JSON.parse(dataInfo),
      chosenValues: [],
    };
    dispatch(addNewCharacteristic(newCharBtn));
  };

  return (
    <div className="mb-6 w-2/3">
      <h2 className="text-base my-3 font-semibold uppercase">
        Выбор характеристик
      </h2>
      <CharacterButtons />
      <div className="flex items-center gap-4 ">
        <select
          onChange={handleSelectChange}
          name="characteristics"
          className="w-1/2 min-w-[250px] border-2 cursor-pointer border-inherit p-2 text-base outline-0"
          placeholder="Выбрать категорию"
          data-te-select-init
          data-te-select-visible-options="3"
        >
          <option value="">Add Character</option>
          {characteristics?.map((item) => (
            <CharacterOption key={item.id} {...item} />
          ))}
        </select>
      </div>
    </div>
  );
}

export default CharacterSection;
