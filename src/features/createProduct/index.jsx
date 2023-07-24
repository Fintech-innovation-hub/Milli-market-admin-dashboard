import { useReducer, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCategoriesQuery } from '../../services/categoryApi';
import SelectListBox from './components/SelectListBox';
// import InputText from '../../../components/Input/InputText';
// import ErrorText from '../../../components/Typography/ErrorText';
// import { useAddCategoryMutation } from '../../../services/categoryApi';
// import { useAddProductMutation } from '../../../services/productApi';
// import { showNotification } from '../../common/headerSlice';
// import AttributeInput from './AttributeInput';
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
  seller: 2,
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

function CreateProduct({ closeModal, extraObject, size }) {
  const {data:categories,isSuccess:isSuccessCategory,isLoading:isLoadingCategory,isError:isErrorCategory}=useCategoriesQuery()
  console.log(categories)
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
  // const [addProduct] = useAddProductMutation();
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
    // addProduct(state);
    //   // addCategory(newLeadObj);

    //   // dispatch(showNotification({ message: 'New Category Added!', status: 1 }));
    //   // closeModal();
    //   // dispatch(addNewLead({newLeadObj}))
  };
  // ------------------------------------------------------------
  // const [errorMessage, setErrorMessage] = useState('');

  // const updateProductTitleFormValue = ({ updateType, value }) => {
  //   setErrorMessage('');
  //   setProductTitleObj({ ...productTitleObj, [updateType]: value });
  // };

  return (
    <div className="w-full  min-h-screen card  p-6 bg-base-100 shadow-xl">
      <div>
        <label htmlFor="category">Choose Category</label>
        <SelectListBox />

      </div>

    </div>
  );
}

export default CreateProduct;
