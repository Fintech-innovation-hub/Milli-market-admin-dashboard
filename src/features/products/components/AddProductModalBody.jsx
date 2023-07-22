import { useReducer, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import {
  useAddCategoryMutation,
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
// import { addNewLead } from "../leadSlice"

const INITIAL_PRODUCT_TITLE_OBJ = {
  title_ln: "",
  title_kr: "",
  title_ru: "",
  title_en: "",
};

const initialValue = {
  title_ln: "tel",
  title_kr: "тел",
  title_ru: "тел",
  title_en: "phone",
  attributes_ln: { 0: "samsung chotki" },
  attributes_kr: { 0: "sam zor" },
  attributes_ru: { 0: "sam chotkiyy" },
  attributes_en: { 0: "samsung best" },
  description_ln: "batafsil",
  description_kr: "hello batafsil",
  description_en: "batafsils",
  description_ru: "podrobni info",
  category: 1515,
  country: 1,
  brand: 1,
  seller: 2,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "attribute":
      const updated = Object.keys(action.payload).reduce((st, attr) => {
        st[attr][Object.keys(st[attr]).length] = action.payload[attr];
        return st;
      }, state);
      // 0
      // ["attributes_ln","attributes_kr","attributes_ru","attributes_en"].reduce((a,b)=>state["attbiteus_ln"][0]=ln)
      return {
        ...state,
        ...updated,
      };
    case "title":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
};

// const attributeInputs = [
//   { name: 'attributes_ln', id: 1, labelTitle: 'attributes ln' },
//   { name: 'attributes_kr', id: 2, labelTitle: 'attributes kr' },
//   { name: 'attributes_ru', id: 3, labelTitle: 'attributes ru' },
//   { name: 'attributes_en', id: 4, labelTitle: 'attributes en' },
// ];

function AddProductModalBody({ closeModal, extraObject, size }) {
  const [attributesObj, setAttributesObj] = useState({
    attributes_ln: "",
    attributes_kr: "",
    attributes_ru: "",
    attributes_en: "",
  });
  // const [ln, setLn] = useState('');
  // const [kr, setKr] = useState('');
  // const [ru, setRu] = useState('');
  // const [en, setEn] = useState('');
  // const sets = [setLn, setKr, setRu, setEn];
  const [addProduct] = useAddProductMutation();
  const [productTitleObj, setProductTitleObj] = useState(
    INITIAL_PRODUCT_TITLE_OBJ
  );

  const [state, dispatch] = useReducer(reducer, initialValue);

  const handleChange = (e) => {
    setAttributesObj({
      ...attributesObj,
      [e.target.name]: e.target.value,
    });
  };
  const updateProductTitleFormValue = ({ updateType, value }) => {
    setProductTitleObj({ ...productTitleObj, [updateType]: value });
  };

  const addAttributesHandler = (e) => {
    dispatch({
      type: "attribute",
      payload: {
        attributes_ln: attributesObj["attributes_ln"],
        attributes_kr: attributesObj["attributes_kr"],
        attributes_ru: attributesObj["attributes_ru"],
        attributes_en: attributesObj["attributes_en"],
      },
    });

    // sets.forEach((fn) => fn(''));
    setAttributesObj({
      attributes_ln: "",
      attributes_kr: "",
      attributes_ru: "",
      attributes_en: "",
    });
    console.log(state);
  };

  const saveNewCategory = () => {
    addProduct(state);
  };
  // ------------------------------------------------------------
  // const [errorMessage, setErrorMessage] = useState('');

  // const updateProductTitleFormValue = ({ updateType, value }) => {
  //   setErrorMessage('');
  //   setProductTitleObj({ ...productTitleObj, [updateType]: value });
  // };

  // const saveNewCategory = () => {
  //   console.log(productTitleObj);
  //   // if (productTitleObj.title_ln.trim() === '')
  //   //   return setErrorMessage('Title uz is required!');
  //   // else if (productTitleObj.title_kr.trim() === '')
  //   //   return setErrorMessage('Title kr is required!');
  //   // else if (productTitleObj.title_ru.trim() === '')
  //   //   return setErrorMessage('Title ru is required!');
  //   // else if (productTitleObj.title_en.trim() === '')
  //   //   return setErrorMessage('Title en is required!');
  //   // else {
  //   //   alert('form ishladi');
  //   // let newLeadObj = {
  //   //   title_ru: productTitleObj.title_ru,
  //   //   title_ln: productTitleObj.title_ln,
  //   //   title_kr: productTitleObj.title_kr,
  //   //   title_en: productTitleObj.title_en,
  //   //   // "avatar": "https://reqres.in/img/faces/1-image.jpg"
  //   // };
  //   // addCategory(newLeadObj);
  //   // dispatch(showNotification({ message: 'New Category Added!', status: 1 }));
  //   // closeModal();
  //   // dispatch(addNewLead({newLeadObj}))
  // };

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
              updateType="title_ln"
              containerStyle="mt-3"
              labelTitle="Title uz"
              updateFormValue={updateProductTitleFormValue}
            />

            <InputText
              name="title_ru"
              type="text"
              defaultValue={productTitleObj.title_kr || ""}
              updateType="title_ru"
              containerStyle="mt-3"
              labelTitle="Title ru"
              updateFormValue={updateProductTitleFormValue}
            /> */}
          </div>
          <div className="w-1/3">
            <div className="">
              <h2 className="text-base my-3 font-semibold uppercase">
                Страна производства
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
            type="text"
            defaultValue={productTitleObj.title_ln || ""}
            updateType="title_ln"
            containerStyle="mt-3"
            labelTitle="Attributes uz"
            updateFormValue={updateProductTitleFormValue}
          />

          <InputText
            name="attribut_uz"
            type="text"
            defaultValue={productTitleObj.title_kr || ""}
            updateType="title_ru"
            containerStyle="mt-3"
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

          <label htmlFor="attribute_kr">Korean attribute</label>
          <input
            className="border border-slate-800"
            defaultValue={attributesObj.attributes_kr}
            // onChange={(e) => setKr(e.target.value)}
            onChange={handleChange}
            type="text"
            id="attribute_kr"
            name="attribute_kr"
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

          <label htmlFor="attribute_en">English attribute</label>
          <input
            className="border border-slate-800"
            defaultValue={attributesObj.attributes_en}
            // onChange={(e) => setEn(e.target.value)}
            onChange={handleChange}
            type="text"
            id="attribute_en"
            name="attribute_en"
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
