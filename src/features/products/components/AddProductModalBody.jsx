import { useState } from 'react';
import { useDispatch } from 'react-redux';
import InputText from '../../../components/Input/InputText';
import ErrorText from '../../../components/Typography/ErrorText';
import { useAddCategoryMutation } from '../../../services/categoryApi';
import { showNotification } from '../../common/headerSlice';
// import { addNewLead } from "../leadSlice"

const INITIAL_PRODUCT_OBJ = {
  title_ln: '',
  title_kr: '',
  title_ru: '',
  title_en: '',
  //   description_ln: '',
  //   description_kr: '',
  //   description_ru: '',
  //   description_en: '',
  attributes_ln: {},
  attributes_kr: {},
  attributes_ru: {},
  attributes_en: {},
};

function AddProductModalBody({ closeModal, extraObject, size }) {
  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');
  const [productObj, setProductObj] = useState(INITIAL_PRODUCT_OBJ);
  const [addCategory] = useAddCategoryMutation();

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage('');
    setProductObj({ ...productObj, [updateType]: value });
  };

  const saveNewCategory = () => {
    if (productObj.title_ln.trim() === '')
      return setErrorMessage('Title uz is required!');
    else if (productObj.title_kr.trim() === '')
      return setErrorMessage('Title kr is required!');
    else if (productObj.title_ru.trim() === '')
      return setErrorMessage('Title ru is required!');
    else if (productObj.title_en.trim() === '')
      return setErrorMessage('Title en is required!');
    else {
      let newLeadObj = {
        title_ru: productObj.title_ru,
        title_ln: productObj.title_ln,
        title_kr: productObj.title_kr,
        title_en: productObj.title_en,
        // "avatar": "https://reqres.in/img/faces/1-image.jpg"
      };
      addCategory(newLeadObj);
      dispatch(showNotification({ message: 'New Category Added!', status: 1 }));
      closeModal();
      // dispatch(addNewLead({newLeadObj}))
    }
  };

  const addAttributesHandler = (e) => {
    e.preventDefault();
    const newAtribute={
        attributes_ln:productObj
    }
  };
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-2">
        {/* title inputs of product */}
        <InputText
          type="text"
          defaultValue={productObj.title_ln}
          updateType="title_ln"
          containerStyle="mt-3"
          labelTitle="Title uz"
          updateFormValue={updateFormValue}
        />

        <InputText
          type="text"
          defaultValue={productObj.title_kr}
          updateType="title_kr"
          containerStyle="mt-3"
          labelTitle="Title kr"
          updateFormValue={updateFormValue}
        />

        <InputText
          type="text"
          defaultValue={productObj.title_ru}
          updateType="title_ru"
          containerStyle="mt-3"
          labelTitle="Title ru"
          updateFormValue={updateFormValue}
        />
        <InputText
          type="text"
          defaultValue={productObj.title_en}
          updateType="title_en"
          containerStyle="mt-3"
          labelTitle="Title en"
          updateFormValue={updateFormValue}
        />

        {/*-------- atributs inputs of product----------- */}
        <form
          onSubmit={addAttributesHandler}
          action=""
          className="flex items-end gap-2 justify-between w-full col-span-4"
        >
          <InputText
            type="text"
            // defaultValue={productObj.attributes_ln}
            updateType="attributes_ln"
            containerStyle=""
            labelTitle="attributes ln"
            isRequired={true}
            updateFormValue={updateFormValue}
          />
          <InputText
            type="text"
            // defaultValue={productObj.attributes_ln}
            updateType="attributes_kr"
            containerStyle=""
            labelTitle="attributes kr"
            updateFormValue={updateFormValue}
            isRequired={true}
          />

          <InputText
            type="text"
            // defaultValue={productObj.attribute_ln}
            updateType="attributes_ru"
            containerStyle=""
            labelTitle="attributes ru"
            updateFormValue={updateFormValue}
            isRequired={true}
          />

          <InputText
            type="text"
            // defaultValue={productObj.attribute_ln}
            updateType="attributes_en"
            containerStyle=""
            labelTitle="attributes en"
            updateFormValue={updateFormValue}
            isRequired={true}
          />
          <button className="bg-sky-500 p-2 rounded text-white">add</button>
        </form>
      </div>

      <ErrorText styleClass="mt-20">{errorMessage}</ErrorText>
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
