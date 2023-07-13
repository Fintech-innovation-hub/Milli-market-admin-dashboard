import { useReducer, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import InputText from '../../../components/Input/InputText';
import ErrorText from '../../../components/Typography/ErrorText';
import { useAddCategoryMutation } from '../../../services/categoryApi';
import { useAddProductMutation } from '../../../services/productApi';
import { showNotification } from '../../common/headerSlice';
import AttributeInput from './AttributeInput';
// import { addNewLead } from "../leadSlice"

const INITIAL_PRODUCT_TITLE_OBJ = {
  title_ln: '',
  title_kr: '',
  title_ru: '',
  title_en: '',
};

const initialValue = {
  title_ln: 'tel',
  title_kr: 'тел',
  title_ru: 'тел',
  title_en: 'phone',
  attributes_ln: { 0: 'samsung chotki' },
  attributes_kr: { 0: 'sam zor' },
  attributes_ru: { 0: 'sam chotkiyy' },
  attributes_en: { 0: 'samsung best' },
  description_ln: 'batafsil',
  description_kr: 'hello batafsil',
  description_en: 'batafsils',
  description_ru: 'podrobni info',
  category: 1515,
  country: 1,
  brand: 1,
  seller:2
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'attribute':
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
    case 'title':
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
    attributes_ln: '',
    attributes_kr: '',
    attributes_ru: '',
    attributes_en: '',
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
      type: 'attribute',
      payload: {
        attributes_ln: attributesObj['attributes_ln'],
        attributes_kr: attributesObj['attributes_kr'],
        attributes_ru: attributesObj['attributes_ru'],
        attributes_en: attributesObj['attributes_en'],
      },
    });

    // sets.forEach((fn) => fn(''));
    setAttributesObj({
      attributes_ln: '',
      attributes_kr: '',
      attributes_ru: '',
      attributes_en: '',
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

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-2">
        {/* title inputs of product */}

        <InputText
          type="text"
          defaultValue={productTitleObj.title_ln || ''}
          updateType="title_ln"
          containerStyle="mt-3"
          labelTitle="Title uz"
          updateFormValue={updateProductTitleFormValue}
        />

        <InputText
          type="text"
          defaultValue={productTitleObj.title_kr || ''}
          updateType="title_kr"
          containerStyle="mt-3"
          labelTitle="Title kr"
          updateFormValue={updateProductTitleFormValue}
        />

        <InputText
          type="text"
          defaultValue={productTitleObj.title_ru || ''}
          updateType="title_ru"
          containerStyle="mt-3"
          labelTitle="Title ru"
          updateFormValue={updateProductTitleFormValue}
        />
        <InputText
          type="text"
          defaultValue={productTitleObj.title_en || ''}
          updateType="title_en"
          containerStyle="mt-3"
          labelTitle="Title en"
          updateFormValue={updateProductTitleFormValue}
        />

        {/*-------- atributs inputs of product----------- */}
        <div className="flex items-end gap-8 my-2 justify-between w-full col-span-4">
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
        </div>
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
    </>
  );
}

export default AddProductModalBody;
