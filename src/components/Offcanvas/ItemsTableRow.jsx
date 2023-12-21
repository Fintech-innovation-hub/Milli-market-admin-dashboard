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
      <td>{index + 1}</td>
      <td>{title || "-"}</td>
      <td>{barcode || '-'}</td>
      <td>{ikpu?.code || '-'}</td>
      <td>{price || "-"}</td>
      <td>{status}</td>
    </tr>
  );
}

export default ItemsTableRow;
