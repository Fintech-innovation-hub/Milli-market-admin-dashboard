import React from 'react';
import ProductTableRow from './ProductTableRow';

function ProductsTable({ products }) {
  console.log(products);
  return (
    <table className="table w-full">
      <thead>
        <tr>
          <th>№</th>
          <th>Title uz</th>
          <th>Seller name</th>
          <th>Categoriya uz</th>
        </tr>
      </thead>
      <tbody>
        {products?.map((product, index) => (
          <ProductTableRow key={product.id} index={index} {...product} />
        ))}
      </tbody>
    </table>
  );
}

export default ProductsTable;
