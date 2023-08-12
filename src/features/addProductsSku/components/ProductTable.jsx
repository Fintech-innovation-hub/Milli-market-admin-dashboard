import React from 'react';
import SkuTableRow from './SkuTableRow';

function ProductTable({ product, inputSku }) {
  console.log(product);
  return (
    <table className="product-table">
      <thead className="">
        <tr>
          <th>№</th>
          <th>Artikul</th>
          <th>Shtrix kod</th>
          <th>IKPU</th>
          <th>Narxi</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody className="overflow-scroll">
        {product?.items?.map((item, index) => (
          <SkuTableRow
            inputSku={inputSku}
            index={index}
            key={item.id}
            {...item}
          />
        ))}
      </tbody>
    </table>
  );
}

export default ProductTable;
