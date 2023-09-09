import { useEffect, useState } from 'react';
import { setPageTitle } from '../../features/common/headerSlice';
import Products from '../../features/products';
import { useNavigate } from 'react-router-dom';
import { useProductsQuery } from '../../services/productApi';
import { Dna } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import TitleCard from '../../components/Cards/TitleCard';
import axios from 'axios';
import { baseUrl } from '../../constants';

const TopSideButtons = () => {
  const navigate = useNavigate();
  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => navigate('/app/products/add/new')}
      >
        Add New Product
      </button>
    </div>
  );
};
function InternalPage() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // const { data, isLoading, isSuccess } = useProductsQuery();
  const [products, setProducts] = useState(null);

  useEffect(() => {
    dispatch(setPageTitle({ title: 'Products' }));
    const fetchData = async () => {
      setLoading(true);
      const headers = {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem('access-token')
        )}`,
      };
      try {
        const data = await axios.get(`${baseUrl}/v1/product/`, {
          headers: headers,
        });
        setLoading(false);
        setProducts(data.data);
      } catch (err) {
        setLoading(false);
        console.log(err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <TitleCard
      title="Current Products"
      topMargin="mt-2"
      TopSideButtons={<TopSideButtons />}
    >
      <div className="overflow-x-auto w-full">
        {loading && (
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
        {products && <Products products={products?.data} />}
      </div>
    </TitleCard>
  );
}

export default InternalPage;
