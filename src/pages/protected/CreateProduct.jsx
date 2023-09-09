import React, { useEffect, useState } from 'react';
import AddProductModalBody from '../..//features/products/components/AddProductModalBody';
import { baseUrl } from '../../constants';
import { useParams } from 'react-router-dom';
import { Dna } from 'react-loader-spinner';


import axios from 'axios';
const AddProducts = () => {
  const { productId } = useParams();
  const [currentProduct, setCurrentProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const headers = {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem('access-token')
        )}`,
      };
      try {
        const data = await axios.get(`${baseUrl}/v1/product/${productId}/`, {
          headers: headers,
        });
        if (data?.data?.status) {
          setCurrentProduct(data?.data);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    if (productId !== 'new') {
      getData();
    }
  }, []);
  return (
    <section>
      {loading ? (
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
      ) : (
        <AddProductModalBody currentProduct={currentProduct?.data} />
      )}
    </section>
  );
};

export default AddProducts;
