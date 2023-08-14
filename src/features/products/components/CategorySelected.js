import React, { useState } from "react";
import {

  useCategoryItemChildDetailsQuery,
  useCategoryItemChildrenDetailsQuery,
  useCategoryItemDetailsQuery,
} from "../../../services/categoryApi";
const CategorySelected = ({
  dataSelect,
  isSuccessSelect,
  setCtgId,
  setParentCtgName1,
  setParentCtgName2,
  setParentCtgName3,
  setParentCtgName4
}) => {

  const [showChildCtg, setShowChildCtg] = useState(false);
  const [showChildItemCtg, setShowChildItemCtg] = useState(false);
  const [showChildrenItemCtg, setShowChildrenItemCtg] = useState(false);
  const [selectId, setSelectId] = useState(
    isSuccessSelect ? dataSelect[0]?.id : ""
  );
  const { data: categoryItem, isSuccessCategoryItem } = useCategoryItemDetailsQuery(selectId);
  const [selectChildId, setSelectChildId] = useState(isSuccessCategoryItem ? categoryItem[0]?.id : "");
  const { data: categoryChildItem, isSuccessCategoryChildItem } =
    useCategoryItemChildDetailsQuery(selectChildId);

  const [selectChildChildId, setSelectChildChildId] = useState(isSuccessCategoryChildItem && categoryChildItem[0]?.id);
  const { data: categoryChildrenItem } = useCategoryItemChildrenDetailsQuery(selectChildChildId)



  return (
    <div className="">
      <select
        // onChange={(value, actionMeta) => console.log(actionMeta.name)}
        onChange={(e) => {

          if (e.target.value) {
            setSelectId(e.target.value);
            setCtgId(e.target.value)
            setShowChildCtg(true);
            setParentCtgName1(e.target.selectedOptions[0].label); // or event.target.options[event.target.selectedIndex].text;
          }
        }}
        className="w-full  border-2 border-inherit p-2 text-base outline-0 cursor-pointer"
        placeholder="Choose Category"
        data-te-select-init
        data-te-select-visible-options="3"
        name="category"
      >
        <option value="">
          Choose Category
        </option>
        {isSuccessSelect &&
          dataSelect.map((item) => (
            <option key={item.id} label={item.title.title_ln} name="hahahha" value={item.id}>
              {item.title}
            </option>
          ))}
      </select>
      {
        showChildCtg && categoryItem.data && (
          <select
            onChange={(e) => {
              setCtgId(e.target.value)
              setSelectChildId(e.target.value);
              setShowChildItemCtg(true)
              setParentCtgName2(e.target.selectedOptions[0].label); // or event.target.options[event.target.selectedIndex].text;

            }}
            className="w-full border-2 border-inherit p-2 my-4 text-base outline-0"
            placeholder="Выбрать категорию"
            data-te-select-init
            data-te-select-visible-options="3"
          >
            {categoryItem?.data?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        )
      }
      {
        (categoryChildItem?.data?.length > 0 && showChildItemCtg) && (
          <select
            onChange={(e) => {
              setCtgId(e.target.value)
              setSelectChildChildId(e.target.value);
              setShowChildrenItemCtg(true)
              setParentCtgName3(e.target.selectedOptions[0].label); // or event.target.options[event.target.selectedIndex].text;

            }}
            className="w-full border-2 border-inherit p-2 my-4 text-base outline-0"
            placeholder="Выбрать категорию"
            data-te-select-init
            data-te-select-visible-options="3"
          >
            {categoryChildItem?.data?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        )
      }
      {/* {(categoryChildrenItem?.data?.length > 0 && showChildrenItemCtg) && (
        <select
          onChange={(e) => {
            console.log(e.target.value);
            setCtgId(e.target.value)
            setParentCtgName4(e.target.selectedOptions[0].label); // or event.target.options[event.target.selectedIndex].text;

          }}
          className="w-full border-2 border-inherit p-2 my-4 text-base outline-0"
          placeholder="Выбрать категорию"
          data-te-select-init
          data-te-select-visible-options="3"
        >
          {categoryChildrenItem?.data?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title.title_ln}
            </option>
          ))}
        </select>
      )} */}
    </div >
  );
};

export default CategorySelected;
