import React, { useState } from "react";
import {
  useCategoriesQuery,
  useCategoryItemChildDetailsQuery,
  useCategoryItemDetailsQuery,
} from "../../../services/categoryApi";
import { useParams } from "react-router-dom";

const CategorySelected = ({ dataSelect, isSuccessSelect }) => {
  
  const [selectId, setSelectId] = useState(
    isSuccessSelect && dataSelect[0]?.id
  );
  const [showChildCtg, setShowChildCtg] = useState(false);
  const { data: categoryItem, isSuccessCategoryItem } =
    useCategoryItemDetailsQuery(selectId);
  const [selectChildId, setSelectChildId] = useState(
    isSuccessCategoryItem && categoryItem[0]?.id
  );
  const { data: categoryChildItem, isSuccessCategoryChildItem } =
    useCategoryItemChildDetailsQuery(selectChildId);

  // console.log(categoryItem?.data, 11);
  console.log(categoryChildItem)

  return (
    <div className="">
      <select
        onChange={(e) => {
          if (e.target.value) {
            setSelectId(e.target.value);
            setShowChildCtg(true);
          }
        }}
        className="w-full border-2 border-inherit p-2 text-base outline-0"
        placeholder="Выбрать категорию"
        data-te-select-init
        data-te-select-visible-options="3"
      >
        {isSuccessSelect &&
          dataSelect.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title.title_ln}
            </option>
          ))}
      </select>
      {showChildCtg && (
        <select
          onChange={(e) => {
            setSelectChildId(e.target.value);
          }}
          className="w-full border-2 border-inherit p-2 my-4 text-base outline-0"
          placeholder="Выбрать категорию"
          data-te-select-init
          data-te-select-visible-options="3"
        >
          {categoryItem?.data?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title.title_ln}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default CategorySelected;
