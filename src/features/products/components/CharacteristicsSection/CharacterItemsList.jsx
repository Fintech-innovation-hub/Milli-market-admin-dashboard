import { useSelector } from 'react-redux';
import CharItemsListItem from './CharItemsListItem';

function CharacterItemsList() {
  const allCharItems = useSelector((state) => state.character.allCharItems);
  return (
    <ul>
      {allCharItems?.map((item) => (
        <CharItemsListItem key={item.id} {...item} />
      ))}
    </ul>
  );
}

export default CharacterItemsList;
