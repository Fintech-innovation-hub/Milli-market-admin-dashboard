import React from 'react';

function ItemsTableRow({
  index,
  id,
  title,
  status,
  price,
  barcode,
  ikpu,
  item
}) {
  console.log(item)
  return (
    <tr>
      <td>{index+1}</td>
      <td>{title || "no"}</td>
      <td>{barcode?.code || 'no'}</td>
      <td>{ikpu?.code || 'no'}</td>
      <td>{price}</td>
      <td>{status}</td>
    </tr>
  );
}

export default ItemsTableRow;
