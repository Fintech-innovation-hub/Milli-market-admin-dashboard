import { useDispatch } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
import { useCategoriesQuery } from "../../services/categoryApi";
import { Dna } from "react-loader-spinner";
import CategoryTable from "./components/CategoryTable";
import LoadingModal from "../../components/Loading";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewCategoryModal = () => {
    dispatch(
      openModal({
        title: "Add New Category",
        bodyType: MODAL_BODY_TYPES.CATEGORY_ADD_NEW,
        extraObject: {
          categoryType: "parent",
        },
      })
    );
  };

  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewCategoryModal()}
      >
        Add New Category
      </button>
    </div>
  );
};

function Categories() {
  const { data: categories, isLoading, isSuccess } = useCategoriesQuery();

  return (
    <>
      <TitleCard
        title="Current Categories"
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
        {isSuccess && categories.status && (
          <CategoryTable categories={categories} />
        )}
      </TitleCard>
    </>
  );
}

export default Categories;
