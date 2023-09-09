import React from 'react';
import ProductTableRow from './ProductTableRow';

function ProductsTable({ products }) {

  return (
    <>
      <table className="product-table w-full">
        <thead>
          <tr>
            <th>№</th>
            <th>Title uz</th>
            <th>Seller name</th>
            <th>Categoriya uz</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product, index) => (
            <ProductTableRow
              product={product}
              key={product.id}
              index={index}
              {...product}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ProductsTable;
