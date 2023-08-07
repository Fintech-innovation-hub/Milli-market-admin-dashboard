import React from 'react';

function ProductTable({ product, inputSku }) {
  console.log(product);
  return (
    <table className="product-table">
      <thead className=''>
        <tr>
          <th>№</th>
          <th>Artikul</th>
          <th>Shtrix kod</th>
          <th>IKPU</th>
          <th>Narxi</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody className='overflow-scroll'>
        {product.map((item, index) => {
          return (
            <tr
              className="hover:bg-slate-400 duration-500 cursor-pointer"
              key={item.id}
            >
              <td>{index + 1}</td>

              <td>{item.title || inputSku}</td>
              <td>
                <input type="text" />
              </td>
              <td>
                <input type="text" />
              </td>
              <td>
                <input type="text" />
              </td>
            
              <td>{item.status}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ProductTable;
