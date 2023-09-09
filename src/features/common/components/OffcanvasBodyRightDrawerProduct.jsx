import React from 'react';
import { useProductItemQuery } from '../../../services/productApi';
import { Dna } from 'react-loader-spinner';
import ProductDetail from '../../productDetail/ProductDetail';

function OffcanvasBodyRightDrawerProduct({ product }) {
  const { data: productDetail, isSuccess, isLoading } = useProductItemQuery(product?.id);
  return (
    <div className='py-5 pr-5'>
      {isLoading && (
        <div className="w-full flex pt-24 h-screen justify-center bg-slate-100 bg-opacity-30">
          <Dna
            visible={true}
            height="200"
            width="200"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      )}
      {isSuccess && <ProductDetail product={product} productDetail={productDetail?.data} />}
    </div>
  );
}

export default OffcanvasBodyRightDrawerProduct;
