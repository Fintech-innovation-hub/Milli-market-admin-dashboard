import React from 'react';
import ItemsTableRow from './ItemsTableRow';

function ItemsTable({ items }) {

  return (
    <table className="table w-full">
      <thead className='lowercase'>
        <tr>
          <th>№</th>
          <th>Title</th>
          <th>Shtrix kod</th>
          <th>Ikpu</th>
          <th>Price</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody className='text-sm'>
        {items.map((item, index) => (
          <ItemsTableRow key={item.id} index={index} item={item} {...item} />
        ))}
      </tbody>
    </table>
  );
}

export default ItemsTable;
