import { useDispatch } from "react-redux";
import { openModal } from "../common/modalSlice";
import { Dna } from "react-loader-spinner";
import { MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
import TitleCard from "../../components/Cards/TitleCard";
import { useAdsProductsQuery } from "../../services/adsProductApi";
import TopProductTable from "../topProduct/components/TopProductTable";


const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewCategoryModal = () => {
    dispatch(
      openModal({
        title: "Add ads product",
        bodyType: MODAL_BODY_TYPES.TOP_PRODUCT_ADD_NEW,
        extraObject:{pageTitle:"Ads Product"}
      })
    );
  };

  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewCategoryModal()}
      >
        Add New Ads Product
      </button>
    </div>
  );
};

function AdsProduct() {

  const { data: adsProducts, isLoading, isSuccess } = useAdsProductsQuery()
  

  return (
    <>
      <TitleCard
        title="Ads Product"
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
          <TopProductTable title={"Ads Product"} data={adsProducts.results}/>
        )}
      </TitleCard>
    </>
  );
}

export default AdsProduct;
