import { useDispatch } from 'react-redux';
import { checkedCharItem } from './characterSlice';

function CharItemsListItem({ id, checked, title }) {
  const dispatch = useDispatch();
  const checkCharItemValueHandler = (e) => {
    dispatch(checkedCharItem({ id, checked: e.target.checked }));
  };

  return (
    <li className="border-b-2 p-2  border-slate-600 border-opacity-50">
      <label className="inline-flex items-center">
        <input
          checked={checked}
          onChange={checkCharItemValueHandler}
          type="checkbox"
          className="w-[20px] h-[20px] cursor-pointer rounded"
        />
        <span className="ml-2 text-black">{title}</span>
      </label>
    </li>
  );
}

export default CharItemsListItem;
