import { useDispatch } from "react-redux";
import { openModal } from "../common/modalSlice";
import { Dna } from "react-loader-spinner";
import { MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
import TitleCard from "../../components/Cards/TitleCard";
import { useTopProductsQuery } from "../../services/topProductApi";
import CardsContainer from "../../components/Cards/CardsContainer";
import TopProductTable from "./components/TopProductTable";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewCategoryModal = () => {
    dispatch(
      openModal({
        title: "Add top product",
        bodyType: MODAL_BODY_TYPES.TOP_PRODUCT_ADD_NEW,
        extraObject:{pageTitle:"Top Product"}
      })
    );
  };

  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewCategoryModal()}
      >
        Add New Top Product
      </button>
    </div>
  );
};

function TopProduct() {

  const { data: topProducts, isLoading, isSuccess } = useTopProductsQuery();
  

  return (
    <>
      <TitleCard
        title="Top Product"
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
        {isSuccess && (
          <TopProductTable title={"Top Product"} data={topProducts.results}/>
        )}
      </TitleCard>
    </>
  );
}

export default TopProduct;
