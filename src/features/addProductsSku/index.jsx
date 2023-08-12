import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProductItemQuery } from '../../services/productApi';
import ProductTable from './components/ProductTable';
import axios from 'axios';
import { useEffect } from 'react';
import { baseUrl } from '../../constants';
import { usePatchProductItemMutation } from '../../services/productApi';
import Steps from '../products/components/Steps';

function AddProductsSku() {
  const [updateProduct, { isLoading }] = usePatchProductItemMutation();
  const navigate = useNavigate();
  const [inputSku, setInputSku] = useState('');
  const [errorSku, setErrorSku] = useState('');
  const { id } = useParams();
  const { data: product, isSuccess } = useProductItemQuery(id);
  const addSkuHandler = (e) => {
    setInputSku(e.target.value);
  };

  useEffect(() => {
    if (inputSku) {
      axios
        .get(
          `${baseUrl}/v1/product/sku/?sku=${inputSku}&seller=${product?.data?.seller_id}`,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem('access-token')
              )}`,
            },
          }
        )
        .then((res) => {
          if (res.data.exists) setErrorSku('Sizda bunday SKU mavjud');
          else setErrorSku('');
        });
    }
  }, [inputSku]);
  const saveSkuDatas = () => {
    const newdata = {
      sku: 'dasa',
      items: [
        {
          id: 13,
          ikpu: 1,
          price: 10,
          barcode: 1,
        },
        {
          id: 12,
          ikpu: 2,
          price: 3,
          barcode: 2,
        },
        {
          id: 11,
          ikpu: 3,
          price: 1000,
          barcode: 1,
        },
        {
          id: 10,
          ikpu: 4,
          price: 3,
          barcode: 2,
        },
      ],
    };
    if (inputSku) {
      updateProduct({ id: id, data: newdata });
      navigate('/app/products/all');
    }
  };
  return (
    <div>
      <Steps title={'second'} />
      <section className="bg-white relative flex flex-col items-start rounded-xl w-full py-6  px-4 mb-5 ">
        <button
          onClick={saveSkuDatas}
          className="btn btn-primary px-6 absolute right-4 top-4 cursor-pointer "
        >
          Save
        </button>
        <button
          className="btn btn-primary px-6 absolute right-32 top-4 cursor-pointer "
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <h1 className="text-2xl font-bolder mb-4">Формирование SKU</h1>
        <p className="w-[800px]">
          SKU — от английского Stock Keeping Unit (идентификатор товарной
          позиции) — единица учёта запасов. SKU назначается для каждого
          возможного варианта товара. К примеру, Ваш товар - “Пальто” и оно
          имеет два цвета - черный и белый, а также три размера - S, M и L.
          Тогда данный товар имеет шесть SKU - черный S, черный M, черный L,
          белый S, белый M и белый L.
          <br />
          Название SKU состоит из обозначения магазина, обозначения товара и
          обозначения характеристик (при их наличии).
          <br />
          Ниже обязательно впишите уникальные SKU обозначения для товара и
          характеристик.
        </p>

        <h1 className="text-base font-bold my-4">SKU ДЛЯ НАЗВАНИЯ TOVARA</h1>
        <div className="w-[700px] flex flex-col gap-1 items-start">
          <label className="text-slate-500" htmlFor="sku">
            SKU of the product (max 7 letter)
          </label>
          <input
            value={inputSku}
            onChange={addSkuHandler}
            type="text"
            className="w-full border-slate-400 uppercase border rounded p-2 outline-none"
            maxLength={'7'}
            placeholder="SKU"
          />
          {errorSku && <p className="text-red-500 font-bolder">{errorSku}</p>}
        </div>
      </section>
      <section>
        {isSuccess && inputSku && (
          <ProductTable inputSku={inputSku} product={product?.data} />
        )}
      </section>
    </div>
  );
}

export default AddProductsSku;
