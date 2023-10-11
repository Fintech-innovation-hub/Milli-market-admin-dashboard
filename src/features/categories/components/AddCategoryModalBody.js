import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import {
  useAddCategoryChildMutation,
  useAddCategoryMutation,
} from "../../../services/categoryApi";
import { showNotification } from "../../common/headerSlice";
import { useSelector } from "react-redux";
// import { addNewLead } from "../leadSlice"

const INITIAL_CATEGORY_OBJ = {
  title_ln: "",
  title_kr: "",
  title_ru: "",
  title_en: "",
};

function AddCategoryModalBody({ closeModal, extraObject, size }) {
  console.log(extraObject);
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.categories.categoryId);
  // const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("");
  const [categoryObj, setCategoryObj] = useState(INITIAL_CATEGORY_OBJ);
  const [addCategory] = useAddCategoryMutation();
  const [addChildCategory] = useAddCategoryChildMutation();

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setCategoryObj({ ...categoryObj, [updateType]: value });
  };

  const saveNewCategory = () => {
    if (categoryObj.title_ln.trim() === "")
      return setErrorMessage("Title uz is required!");
    else if (categoryObj.title_kr.trim() === "")
      return setErrorMessage("Title kr is required!");
    else if (categoryObj.title_ru.trim() === "")
      return setErrorMessage("Title ru is required!");
    else if (categoryObj.title_en.trim() === "")
      return setErrorMessage("Title en is required!");
    else {
      let newCategoryObj = {
        title_ru: categoryObj.title_ru,
        title_ln: categoryObj.title_ln,
        title_kr: categoryObj.title_kr,
        title_en: categoryObj.title_en,
        // "avatar": "https://reqres.in/img/faces/1-image.jpg"
      };
      (extraObject?.categoryType === "parent"
        ? addCategory(newCategoryObj)
        : addChildCategory({ parent: categoryId,...newCategoryObj })
      ).then((res) => {
        dispatch(
          showNotification({ message: "New Category Added!", status: 1 })
        );

        closeModal();
      });
    }
  };

  return (
    <>
      <InputText
        type="text"
        defaultValue={categoryObj.title_ln}
        updateType="title_ln"
        containerStyle="mt-4"
        labelTitle="Title uz"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={categoryObj.title_kr}
        updateType="title_kr"
        containerStyle="mt-4"
        labelTitle="Title kr"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={categoryObj.title_ru}
        updateType="title_ru"
        containerStyle="mt-4"
        labelTitle="Title ru"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="text"
        defaultValue={categoryObj.title_ru}
        updateType="title_en"
        containerStyle="mt-4"
        labelTitle="Title en"
        updateFormValue={updateFormValue}
      />

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
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

export default AddCategoryModalBody;
