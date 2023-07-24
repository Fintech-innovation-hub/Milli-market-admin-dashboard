import { useReducer, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import InputText from '../../../components/Input/InputText';
import ErrorText from '../../../components/Typography/ErrorText';
import {
  useCategoriesQuery,
} from "../../../services/categoryApi";
import { useAddProductMutation } from "../../../services/productApi";
import { showNotification } from "../../common/headerSlice";
import AttributeInput from "./AttributeInput";
import CategorySelected from "./CategorySelected";
import Editor from "./Editor";
import { useCountriesQuery } from "../../../services/countryApi";
import { useBrandsQuery } from "../../../services/brandApi";
import Steps from "./Steps";
import DoubleEditor from "./DoubleEditor";
import DownloadImg from "./DownloadImg";


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

  const { data: brand, isSuccess: isSuccessBrand } = useBrandsQuery();
  // console.log(brand.data[0].id, "DATA 11");

  // Add Product Info
  const [productMainInfo, setProductMainInfo] = useState({
    category: "",
    titleUz: "",
    titleRu: "",
    country: country?.data[0]?.id,
    brand: brand?.data[0]?.id,
    descUz: "",
    descRu: "",
    attributUz: "",
    attributRu: "",
  });
  const { titleUz, titleRu, attributUz, attributRu, descUz, descRu } =
    productMainInfo;
  const [title, setTitle] = useState("");

  const productInfo = (e) => {
    setProductMainInfo((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  console.log(productMainInfo, "Info");
  // const [value, setValue] = useState("");
  // const getValue = (value) => {
  //   setValue(value);
  // };

  const [showCompound, setShowCompound] = useState(false);
  const [showInstruction, setShowInstruction] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

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

        {/* title inputs of product */}
        <div className="flex items-center justify-between">
          <Steps />
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
        <div className="w-7/12">
          <h2 className="text-2xl font-semibold mb-2">Категория товара</h2>
          <CategorySelected
            dataSelect={data?.data}
            isSuccessSelect={isSuccess}
          />
        </div>

        <h2 className="text-2xl font-semibold">Kategoriya</h2>
        <CategorySelected
          setCtg={setCtg}
          dataSelect={data?.data}
          isSuccessSelect={isSuccess}
        />

        <div className="flex w-full gap-x-5">
          <div className="w-2/3">
            <div className={`form-control w-full mt-3`}>
              <label className="label">
                <span className={"label-text text-base-content font-bold "}>
                  Title_uz
                </span>
              </label>
              <input
                required
                type="text"
                value={titleUz}
                // placeholder="title_uz"
                onChange={productInfo}
                name="titleUz"
                className="border border-solid border-gray-400 rounded p-2 outline-none  input-bordered w-full  "
              />
            </div>
            <div className={`form-control w-full mt-3`}>
              <label className="label">
                <span className={"label-text text-base-content font-bold "}>
                  Title_ru
                </span>
              </label>
              <input
                required
                type="text"
                value={titleRu}
                // placeholder="title_uz"
                onChange={productInfo}
                name="titleRu"
                className="border border-solid border-gray-400 rounded p-2 outline-none  input-bordered w-full  "
              />
            </div>
            {/* <InputText
              name="title_uz"
              type="text"
              defaultValue={titleUz || ""}

              defaultValue={productTitleObj.title_ln || ''}

              updateType="title_ln"
              containerStyle="mt-3"
              labelTitle="TITLE UZ"
              updateFormValue={updateProductTitleFormValue}
            />

            <InputText
              name="title_ru"
              type="text"
              defaultValue={productTitleObj.title_kr || ''}
              updateType="title_ru"
              containerStyle="mt-3"
              labelTitle="TITLE RU"
              updateFormValue={updateProductTitleFormValue}
            /> */}
          </div>
          <div className="w-1/3">
            <div className="">
              <h2 className="text-base my-3 font-semibold uppercase">
                Country
              </h2>
              <select
                onChange={productInfo}
                name="country"
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

                onChange={productInfo}
                name="brand"

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

                {isSuccessBrand &&
                  brand?.data?.map((item) => (
                    <option key={item.id} value={item.id}>

                {isSuccessBrands &&
                  brands?.data?.map((item) => (

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

            initialValue={descUz}
            productInfo={productInfo}
            // name="descUz"

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

            initialValue={descRu}
            productInfo={productInfo}
            // name="descRu"
          />
          {/* getValue={getValue} */}
        </div>
        <div className="flex gap-x-5 items-end">
          <div className={`form-control w-full mt-3`}>
            <label className="label">
              <span className={"label-text text-base-content font-bold "}>
                Attribut_uz
              </span>
            </label>
            <input
              required
              type="text"
              value={attributUz}
              // placeholder="title_uz"
              onChange={productInfo}
              name="attributUz"
              className="border border-solid border-gray-400 rounded p-2 outline-none  input-bordered w-full  "
            />
          </div>
          <div className={`form-control w-full mt-3`}>
            <label className="label">
              <span className={"label-text text-base-content font-bold "}>
                Attribut_ru
              </span>
            </label>
            <input
              required
              type="text"
              value={attributRu}
              // placeholder="title_uz"
              onChange={productInfo}
              name="attributRu"
              className="border border-solid border-gray-400 rounded p-2 outline-none  input-bordered w-full  "
            />
          </div>
          <button
            className="btn btn-primary px-6"
            // onClick={() => saveNewCategory()}
          >
            Add
          </button>
          {/* <InputText
            name="attribut_uz"

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
            name="attribut_uz"
            type="text"
            defaultValue={productTitleObj.title_kr || ''}
            updateType="title_ru"
            onChange={(e) => setRu(e.target.value)}
            // containerStyle="mt-3"
            labelTitle="Attributes ru"

            updateFormValue={updateProductTitleFormValue}
          /> */}
        </div>
        <div className="">
          <div className="mb-6 w-2/3">
            <h2 className="text-base my-3 font-semibold uppercase">
              Выбор характеристик
            </h2>
            <select
              onChange={productInfo}
              name="brand"
              className="w-full border-2 border-inherit p-2 text-base outline-0"
              placeholder="Выбрать категорию"
              data-te-select-init
              data-te-select-visible-options="3"
            >
              {isSuccessBrand &&
                brand?.data?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
            </select>
          </div>
          <div className="h-0.5 bg-slate-300"></div>
          <div className="flex flex-col w-2/3 mb-8">
            <div className="mb-5">
              <h2 className="text-base my-3 font-semibold uppercase">
                Состав на Узбекском
              </h2>
              <p className="mb-7">Укажите состав товара</p>
              <button
                className="btn btn-success text-white px-6"
                onClick={() => setShowCompound(!showCompound)}
              >
                Добавить
              </button>
            </div>
            {showCompound && (
              <DoubleEditor
                productInfo={productInfo}
                initialValue={descUz}
                textLabel={"Состав"}
              />
            )}
          </div>
          <div className="h-0.5 bg-slate-300"></div>
          <div className="flex flex-col w-2/3 mb-8">
            <div className="mb-5">
              <h2 className="text-base my-3 font-semibold uppercase">
                Инструкция на Узбекском
              </h2>
              <p className="mb-7">Укажите состав товара</p>
              <button
                className="btn btn-success text-white px-6"
                onClick={() => setShowInstruction(!showInstruction)}
              >
                Добавить
              </button>
            </div>
            {showInstruction && (
              <DoubleEditor
                productInfo={productInfo}
                initialValue={descUz}
                textLabel={"Инструкция"}
              />
            )}
          </div>
          <div className="h-0.5 bg-slate-300"></div>
          <div className="flex flex-col w-2/3 mb-8">
            <div className="mb-5">
              <h2 className="text-base my-3 font-semibold uppercase">
                Сертификаты на Узбекском
              </h2>
              <p className="mb-7">Укажите состав товара</p>
              <button
                className="btn btn-success text-white px-6"
                onClick={() => setShowCertificate(!showCertificate)}
              >
                Добавить
              </button>
            </div>
            {showCertificate && (
              <DoubleEditor
                productInfo={productInfo}
                initialValue={descUz}
                textLabel={"Сертификаты"}
              />
            )}
          </div>
          <div className="h-0.5 bg-slate-300"></div>
          <div className="">
            <div className="">
            <h2 className="text-base my-3 font-semibold uppercase">Загрузить фотографии</h2>
              <DownloadImg textDownload={"фото"} />
            </div>
            <div className="">
              <h2 className="text-base my-3 font-semibold uppercase">Загрузить видео (размер до 10мб)</h2>
              <DownloadImg textDownload={"видео"} />
            </div>
          </div>
          <div className="w-2/3">
            <h2 className="text-base my-3 font-semibold uppercase">Модель</h2>
            <select
              onChange={productInfo}
              name="brand"
              className="w-full border-2 border-inherit p-2 text-base outline-0"
              placeholder="Выбрать категорию"
              data-te-select-init
              data-te-select-visible-options="3"
            >
              {isSuccessBrand &&
                brand?.data?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
            </select>
          </div>

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
    </div>
  );
}

export default AddProductModalBody;
