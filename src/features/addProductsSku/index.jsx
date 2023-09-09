import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProductItemQuery } from '../../services/productApi';
import ProductTable from './components/ProductTable';
import axios from 'axios';
import { useEffect } from 'react';
import { baseUrl } from '../../constants';
import { usePatchProductItemMutation } from '../../services/productApi';
import ProductFormTop from '../products/components/ProductFormTop';

function AddProductsSku({ product, id }) {
  console.log(product);
  const [disabledSku, setDisabledSku] = useState(false);
  const [updateProduct, { isLoading }] = usePatchProductItemMutation();
  const [itemsDatas, setItemsDatas] = useState([]);
  const navigate = useNavigate();
  const [inputSku, setInputSku] = useState(product?.sku || '');
  const [errorSku, setErrorSku] = useState('');
  const addSkuHandler = (e) => {
    setInputSku(e.target.value);
  };

  useEffect(() => {
    if (inputSku) {
      axios
        .get(
          `${baseUrl}/v1/product/sku/?sku=${inputSku}&seller=${product?.seller_id}`,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem('access-token')
              )}`,
            },
          }
        )
        .then((res) => {
          if (res.data.exists) setDisabledSku(true);
          else setDisabledSku(false);
        });
    }
  }, [inputSku]);

  const saveNewProduct = (btnTitle) => {
    if (!inputSku) {
      navigate('/app/products/all');
      return;
    }
    const checkIkpus = itemsDatas.every((item) => item.ikpu);
    const checkPrices = itemsDatas.every((item) => item.price);
    if (!checkIkpus) {
      alert('Ikpularni toliq kiriting!');
      return;
    }
    if (!checkPrices) {
      alert('Narxlarni toliq kiriting!');
      return;
    }
    if (inputSku) {
      const newdata = {
        sku: inputSku,
        items: itemsDatas,
      };
      updateProduct({ id: id, data: newdata });
      navigate('/app/products/all');
    }
  };

  return (
    <div>
      <section className="bg-white relative flex flex-col items-start rounded-xl w-full py-2  px-4 mb-5 ">
        <ProductFormTop
          id={id}
          saveNewProduct={saveNewProduct}
          title="second"
        />
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
            disabled={disabledSku}
            value={inputSku}
            defaultValue={product?.data?.sku}
            onChange={addSkuHandler}
            type="text"
            className={`w-full border-slate-400 ${
              disabledSku && 'bg-gray-300'
            } uppercase border rounded p-2 outline-none`}
            maxLength={'7'}
            placeholder="SKU"
          />
          {errorSku && <p className="text-red-500 font-bolder">{errorSku}</p>}
        </div>
      </section>
      <section>
        {inputSku && (
          <ProductTable
            setItemsDatas={setItemsDatas}
            inputSku={inputSku}
            product={product}
          />
        )}
      </section>
    </div>
  );
}

export default AddProductsSku;
