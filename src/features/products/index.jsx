import ProductsTable from './components/ProductsTable';

function Products({ products }) {

  return (
    <div className="overflow-x-auto w-full">
      <ProductsTable products={products} />
    </div>
  );
}

export default Products;
