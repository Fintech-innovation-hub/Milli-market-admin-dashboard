import React from 'react';

function ItemsTableRow({
  index,
  id,
  title,
  status,
  price,
  barcode_code,
  ikpu_code,
}) {
  return (
    <tr>
      <td>{index}</td>
      <td>{title || "no"}</td>
      <td>{barcode_code || 'no'}</td>
      <td>{ikpu_code || 'no'}</td>
      <td>{price}</td>
      <td>{status}</td>
    </tr>
  );
}

export default ItemsTableRow;
