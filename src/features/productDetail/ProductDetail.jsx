import React from 'react';
import ItemsTable from '../../components/Offcanvas/ItemsTable';
import Product from '../../assets/images/mahsulot.jpg';
import { formatDate } from '../../utils/formatDate';

function ProductDetail({ productDetail, product }) {
  console.log(productDetail);


  return (
    <div className="flex flex-col gap-y-5 items-start ">
      <div className="flex items-center gap-4">
        <div className='flex flex-col items-start gap-4'>
          {productDetail?.images && productDetail?.images.map((rasm, index) => (
            <img key={index} className="h-64 w-80 rounded-lg object-cover" src={rasm} alt="" />
          ))}
        </div>
        <div className="flex flex-col items-start gap-5">
          <h1 className="text-xl">
            Title: <b className="capitalize">{product?.title}</b>
          </h1>
          <h1 className="text-xl">
            Category: <b className="capitalize">{product?.category_name}</b>
          </h1>
          <h1 className="text-xl">
            Seller: <b className="capitalize">{product?.seller_name}</b>
          </h1>
          <h1 className="text-xl">
            Created at:{' '}
            <b className="capitalize">{formatDate(product?.created_at)}</b>
          </h1>
          <h1 className="text-xl">
            Sku: <b className="capitalize">{product?.sku || 'Mavjud emas'}</b>
          </h1>
        </div>
      </div>
      <ItemsTable items={productDetail?.items} />
    </div>
  );
}

export default ProductDetail;
