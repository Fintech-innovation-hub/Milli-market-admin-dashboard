import React, { useState } from "react";
import CategorySelected from "./CategorySelected";
import { useCategoriesQuery } from "../../../../services/categoryApi";

function ProductCategorySelect({ setCtgId, category,title }) {
  const [parentCtgName1, setParentCtgName1] = useState(
   title ? category?.title_ln : category?.parent?.parent?.title
  );
  const [parentCtgName2, setParentCtgName2] = useState(category?.parent?.title);
  const [parentCtgName3, setParentCtgName3] = useState(category?.title);
  const [parentCtgName4, setParentCtgName4] = useState("");
  const [showCategory, setShowCategory] = useState(true);

  const { data, isSuccess } = useCategoriesQuery();
  const addCategory = () => {
    if (parentCtgName1) setShowCategory(false);
  };
  const changeCategory = () => {
    setShowCategory(true);
    setParentCtgName1("");
    setParentCtgName2("");
    setParentCtgName3("");
    setParentCtgName4("");
  };

  return (
    <div className="w-full flex flex-col  gap-1 items-start">
      <h2 className="text-xl font-semibold">Категория товара</h2>

      {category && (
        <div className="flex items-center">
          <h3>
            {parentCtgName1 && `${parentCtgName1} `}{" "}
            {parentCtgName2 && `/ ${parentCtgName2} /`}
            {parentCtgName3 && `${parentCtgName3} /`} {parentCtgName4}
          </h3>
        </div>
      )}
      {!category && !showCategory && (
        <div className="flex items-center">
          <h3>
            {parentCtgName1 && `${parentCtgName1} `}
            {parentCtgName2 && `/ ${parentCtgName2} /`}
            {parentCtgName3 && `${parentCtgName3} /`} {parentCtgName4}
          </h3>
        </div>
      )}
      {showCategory && (
        <CategorySelected
          setCtgId={setCtgId}
          dataSelect={data?.data}
          isSuccessSelect={isSuccess}
          parentCtgName1={parentCtgName1}
          parentCtgName2={parentCtgName2}
          parentCtgName3={parentCtgName3}
          setParentCtgName1={setParentCtgName1}
          setParentCtgName2={setParentCtgName2}
          setParentCtgName3={setParentCtgName3}
          setParentCtgName4={setParentCtgName4}
        />
      )}
      {showCategory ? (
        <button
          type="button"
          onClick={addCategory}
          className="border-none bg-slate-500 p-2 rounded cursor-pointer text-white"
        >
          choose categoriya
        </button>
      ) : (
        <button
          type="button"
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
