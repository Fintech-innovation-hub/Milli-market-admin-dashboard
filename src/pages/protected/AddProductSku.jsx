import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AddProductsSku from '../../features/addProductsSku';
import { setPageTitle } from '../../features/common/headerSlice';
import { useProductItemQuery } from '../../services/productApi';
import {useParams} from 'react-router-dom';
import { Dna } from 'react-loader-spinner';


function InternalPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data: product, isSuccess,isLoading} = useProductItemQuery(id);
  useEffect(() => {
    dispatch(setPageTitle({ title: 'Edit Product' }));
  }, []);

  return (
  <>
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
    
   {isSuccess && <AddProductsSku  product={product?.data} id={id} />}

    </>
    )

   
}

export default InternalPage;
