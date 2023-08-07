import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProductItemQuery } from '../../services/productApi';
import ProductTable from './ProductTable';

function AddProductsSku() {
  const [inputSku, setInputSku] = useState('');
  const { id } = useParams();
  const { data: product, isSuccess } = useProductItemQuery(id);

  const addSkuHandler = (e) => {
    setInputSku(e.target.value);
  };
  return (
    <div>
      <section className="bg-white flex flex-col items-start rounded-xl w-full py-6  px-4 mb-5 ">
        <h1 className="text-2xl font-bolder mb-4">Формирование SKU</h1>
        <p className='w-[800px]'>
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
