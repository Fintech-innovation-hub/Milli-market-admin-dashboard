import { useDispatch } from "react-redux";

import { Dna } from "react-loader-spinner";
import TitleCard from "../../../components/Cards/TitleCard";
import { openModal } from "../../common/modalSlice";
import { MODAL_BODY_TYPES } from "../../../utils/globalConstantUtil";
import { useCategoryItemDetailsQuery } from "../../../services/categoryApi";
import CategoryTable from "./CategoryTable";
import { useSelector } from "react-redux";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewCategoryModal = () => {
    dispatch(
      openModal({
        title: "Add New Child Category",
        bodyType: MODAL_BODY_TYPES.CATEGORY_ADD_NEW,
        extraObject: {
          categoryType: "child"
        }
      })
    );
  };

  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewCategoryModal()}
      >
        Add New Child Category
      </button>
    </div>
  );
};

function ChildCategoryUi() {
  const categoryId = useSelector(state => state.categories.categoryId)
  const { data: childCategories, isLoading, isSuccess } = useCategoryItemDetailsQuery(categoryId);
  console.log(childCategories)

  return (
    <>
      <TitleCard
        title={`${childCategories?.parent?.title_ln}` || ""}
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {isLoading && (
          <div className="w-full flex pt-24 h-screen justify-center bg-slate-100 bg-opacity-30">
            <Dna
              visible={true}
              height="200"
              width="200"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>
        )}
        {isSuccess && childCategories.status && (
          <CategoryTable categories={childCategories} />
        )}
      </TitleCard>
    </>
  );
}

export default ChildCategoryUi;
