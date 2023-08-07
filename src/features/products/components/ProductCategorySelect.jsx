import React, { useState } from 'react';
import CategorySelected from './CategorySelected';
import { useCategoriesQuery } from '../../../services/categoryApi';

function ProductCategorySelect({ setCtgId }) {
  const [parentCtgName1, setParentCtgName1] = useState('');
  const [parentCtgName2, setParentCtgName2] = useState('');
  const [parentCtgName3, setParentCtgName3] = useState('');
  const [parentCtgName4, setParentCtgName4] = useState('');
  const [showCategory, setShowCategory] = useState(true);

  const { data, isSuccess } = useCategoriesQuery();
  const addCategory = () => {
    if(parentCtgName1)
    setShowCategory(false);
  };
  const changeCategory = () => {
    setShowCategory(true);
    setParentCtgName1('');
    setParentCtgName2('');
    setParentCtgName3('');
    setParentCtgName4('');
  };

  return (
    <div className="w-7/12 flex flex-col gap-3 items-start">
      <h2 className="text-2xl font-semibold mb-2">Категория товара</h2>
      {!showCategory && (
        <div className="flex items-center">
          <h3>
            {parentCtgName1} / {parentCtgName2} / {parentCtgName3} / {parentCtgName4}
          </h3>
        </div>
      )}
      {showCategory && (
        <CategorySelected
          setCtgId={setCtgId}
          dataSelect={data?.data}
          isSuccessSelect={isSuccess}
          setParentCtgName1={setParentCtgName1}
          setParentCtgName2={setParentCtgName2}
          setParentCtgName3={setParentCtgName3}
          setParentCtgName4={setParentCtgName4}
        />
      )}
      {showCategory ? (
        <button
          onClick={addCategory}
          className="border-none bg-slate-500 p-2 rounded cursor-pointer text-white"
        >
          choose categoriya
        </button>
      ) : (
        <button
          onClick={changeCategory}
          className="border-none bg-slate-500 p-2 rounded cursor-pointer text-white"
        >
          change categoriya
        </button>
      )}
    </div>
  );
}

export default ProductCategorySelect;
