import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import SkuTableRow from './SkuTableRow';

function ProductTable({ product, inputSku, setItemsDatas, itemsDatas }) {
  const [items, setItems] = useState(product?.items);

  useEffect(() => {
    const datas=items.map(item=>{
      return {
        ikpu:item.ikpu,
        id:item.id,
        barcode:item.barcode || 3,
        price:item.price
      }
    })
    setItemsDatas(datas);
  }, [items]);
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
        {items?.map((item, index, self) => (
          <SkuTableRow
            self={self}
            setItems={setItems}
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
