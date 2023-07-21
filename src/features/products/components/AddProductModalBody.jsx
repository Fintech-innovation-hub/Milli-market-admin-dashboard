import { useReducer, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import InputText from '../../../components/Input/InputText';
import ErrorText from '../../../components/Typography/ErrorText';
import {
  useCategoriesQuery,
  useCategoryItemChildDetailsQuery,
} from '../../../services/categoryApi';
import { useAddProductMutation } from '../../../services/productApi';
import { showNotification } from '../../common/headerSlice';
import CategorySelected from './CategorySelected';
import Editor from './Editor';
import { useCountriesQuery } from '../../../services/countryApi';
import { useBrandsQuery } from '../../../services/brandApi';

const INITIAL_PRODUCT_TITLE_OBJ = {
  title_ln: '',
  title_ru: '',
};
const initialValue = {
  title_ln: '',
  title_ru: '',
  attributes_ln: {},
  attributes_ru: {},
  description_ln: '',
  description_ru: '',
  category: 1515,
  country: 1,
  brand: 1,
  seller: 2,
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'attribute':
      const updated = Object.keys(action.payload).reduce((st, attr) => {
        st[attr][Object.keys(st[attr]).length] = action.payload[attr];
        return st;
      }, state);

      return {
        ...state,
        ...updated,
      };
    case 'title':
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
};

function AddProductModalBody({ closeModal, extraObject, size }) {
  const [ln, setLn] = useState('');
  const [ru, setRu] = useState('');
  const [ctg, setCtg] = useState('');
  const sets = [setLn, setRu];
  const [addProduct] = useAddProductMutation();
  const [productTitleObj, setProductTitleObj] = useState(
    INITIAL_PRODUCT_TITLE_OBJ
  );

  const [state, dispatch] = useReducer(reducer, initialValue);

  const updateProductTitleFormValue = ({ updateType, value }) => {
    dispatch({ type: 'title', payload: { name: updateType, value: value } });
    // setProductTitleObj({ ...productTitleObj, [updateType]: value });
  };

  const addAttributesHandler = (e) => {
    dispatch({
      type: 'attribute',
      payload: {
        attributes_ln: ln,
        attributes_ru: ru,
      },
    });

    sets.forEach((fn) => fn(''));
  };

  const saveNewCategory = () => {
    // addProduct(state);
    const newData = {
      ...state,
      category: ctg,
      country: 1,
      brand: 1,
      seller: 2,
    };
    console.log(newData);
  };
  // const {data, isSuccess} = useCategoriesQuery();
  const { data, isLoading, isSuccess } = useCategoriesQuery();
  const { data: country, isSuccess: isSuccessCountry } = useCountriesQuery();
  const { data: brands, isSuccess: isSuccessBrands } = useBrandsQuery();
  console.log(country);
  // console.log(country?.data, 'DATA 11');
  const [value, setValue] = useState('');
  const getValue = (value) => {
    setValue(value);
  };

  const [selectId, setSelectId] = useState();

  // const { data: categoryItemData } = useCategoryItemChildDetailsQuery(selectId);

  return (
    <div className="bg-white rounded-xl py-7 px-14 ">
      <div className="grid grid-cols-1 gap-x-5 gap-y-2 w-full">
        <h2 className="text-2xl font-semibold">Kategoriya</h2>
        <CategorySelected
          setCtg={setCtg}
          dataSelect={data?.data}
          isSuccessSelect={isSuccess}
        />
        <div className="flex w-full gap-x-5">
          <div className="w-2/3">
            <InputText
              type="text"
              defaultValue={productTitleObj.title_ln || ''}
              updateType="title_ln"
              containerStyle="mt-3"
              labelTitle="TITLE UZ"
              updateFormValue={updateProductTitleFormValue}
            />

            <InputText
              type="text"
              defaultValue={productTitleObj.title_kr || ''}
              updateType="title_ru"
              containerStyle="mt-3"
              labelTitle="TITLE RU"
              updateFormValue={updateProductTitleFormValue}
            />
          </div>
          <div className="w-1/3">
            <div className="">
              <h2 className="text-base my-3 font-semibold uppercase">
                Country
              </h2>
              <select
                onChange={(e) => setSelectId(e.target.value)}
                className="w-full border-2 border-inherit p-2 text-base outline-0"
                placeholder="Выбрать категорию"
                data-te-select-init
                data-te-select-visible-options="3"
              >
                {isSuccessCountry &&
                  country?.data?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  ))}
              </select>
            </div>
            <div className="">
              <h2 className="text-base my-3 font-semibold uppercase">Бранд</h2>
              <select
                onChange={(e) => {
                  setSelectId(e.target.value);
                  dispatch({
                    type: 'title',
                    payload: { name: e.target.name, value: e.target.value },
                  });
                }}
                className="w-full border-2 border-inherit p-2 text-base outline-0"
                placeholder="Choose brend"
                data-te-select-init
                data-te-select-visible-options="3"
              >
                {isSuccessBrands &&
                  brands?.data?.map((item) => (
                    <option key={item.id} name="category" value={item.id}>
                      {item.title}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
        <div className="">
          <h2 className="text-base my-3 font-semibold uppercase">
            PRODUCT DESCRIPTION IN UZBEK
          </h2>
          <Editor
            updateProductTitleFormValue={updateProductTitleFormValue}
            initialValue="description_ln"
            getValue={getValue}
          />
        </div>
        <div className="">
          <h2 className="text-base my-3 font-semibold uppercase">
            Описание товара на русском
          </h2>
          <Editor
            updateProductTitleFormValue={updateProductTitleFormValue}
            initialValue="description_ru"
            getValue={getValue}
          />
        </div>
        <div className="flex gap-x-5 items-end">
          <label htmlFor="attribute_ln">Latin attribute</label>
          <input
            // defaultValue={attributesObj.attributes_ln}
            onChange={(e) => setLn(e.target.value)}
            // onChange={handleChange}
            type="text"
            id="attribute_ln"
            name="attribute_ln"
            className="border border-slate-800"
          />

          <label htmlFor="attribute_ru">Russian attribute</label>
          <input
            className="border border-slate-800"
            // defaultValue={attributesObj.attributes_ru}
            onChange={(e) => setRu(e.target.value)}
            // onChange={handleChange}
            type="text"
            id="attribute_ru"
            name="attribute_ru"
          />

          <button
            onClick={addAttributesHandler}
            type="button"
            className="bg-sky-500 p-2 text-lg rounded text-white flex-1 "
          >
            add
          </button>
          {/* <InputText
            type="text"
            defaultValue={productTitleObj.title_ln || ''}
            updateType="title_ln"
            // containerStyle="mt-3"
            labelTitle="Attributes uz"
            onChange={(e) => setLn(e.target.value)}

            // updateFormValue={updateProductTitleFormValue}
          />

          <InputText
            type="text"
            defaultValue={productTitleObj.title_kr || ''}
            updateType="title_ru"
            onChange={(e) => setRu(e.target.value)}
            // containerStyle="mt-3"
            labelTitle="Attributes ru"
            // updateFormValue={updateProductTitleFormValue}
          />
          <button
            onClick={addAttributesHandler}
            type="button"
            className="bg-sky-500 p-2 text-lg rounded text-white flex-1 "
          >
            add
          </button> */}
        </div>
        {/*-------- atributs inputs of product----------- */}
        {/* <div className="flex items-end gap-8 my-2 justify-between w-full col-span-4">
          <label htmlFor="attribute_ln">Latin attribute</label>
          <input
            defaultValue={attributesObj.attributes_ln}
            // onChange={(e) => setLn(e.target.value)}
            onChange={handleChange}
            type="text"
            id="attribute_ln"
            name="attribute_ln"
            className="border border-slate-800"
          />

        
          <label htmlFor="attribute_ru">Russian attribute</label>
          <input
            className="border border-slate-800"
            defaultValue={attributesObj.attributes_ru}
            // onChange={(e) => setRu(e.target.value)}
            onChange={handleChange}
            type="text"
            id="attribute_ru"
            name="attribute_ru"
          />

          <button
            onClick={addAttributesHandler}
            type="button"
            className="bg-sky-500 p-2 text-lg rounded text-white flex-1 "
          >
            add
          </button> 
        </div> */}
        {/* <div className="flex items-end gap-8 my-2 justify-between w-full col-span-4">
          {attributeInputs.map((item, index) => (
            <AttributeInput key={item.id} {...item} />
          ))}
          <button
            onClick={addAttributesHandler}
            type="button"
            className="bg-sky-500 p-2 text-lg rounded text-white flex-1 "
          >
            add
          </button>
        </div> */}
      </div>

      {/* <ErrorText styleClass="mt-20">{errorMessage}</ErrorText> */}
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button
          className="btn btn-primary px-6"
          onClick={() => saveNewCategory()}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default AddProductModalBody;
