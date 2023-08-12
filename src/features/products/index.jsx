import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TitleCard from '../../components/Cards/TitleCard';
import { openModal } from '../common/modalSlice';
import { showNotification } from '../common/headerSlice';
import { useCategoriesQuery } from '../../services/categoryApi';
import { useNavigate } from 'react-router-dom';
import { useProductsQuery } from '../../services/productApi';
import ProductsTable from './components/ProductsTable';
import { Dna } from 'react-loader-spinner';

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => navigate('/app/products/add')}
      >
        Add New Product
      </button>
    </div>
  );
};

function Products() {
  // const { leads } = useSelector(state => state.lead)

  const { data: products, isLoading, isSuccess, isError } = useProductsQuery();

  const getDummyStatus = (index) => {
    if (index % 5 === 0) return <div className="badge">Not Interested</div>;
    else if (index % 5 === 1)
      return <div className="badge badge-primary">In Progress</div>;
    else if (index % 5 === 2)
      return <div className="badge badge-secondary">Sold</div>;
    else if (index % 5 === 3)
      return <div className="badge badge-accent">Need Followup</div>;
    else return <div className="badge badge-ghost">Open</div>;
  };

  return (
    <>
      <TitleCard
        title="Current Products"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
       
        <div className="overflow-x-auto w-full">
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
          {isSuccess && <ProductsTable products={products?.results} />}
        </div>
      </TitleCard>
    </>
  );
}

export default Products;
