import { useDispatch } from "react-redux";
import { openModal } from "../common/modalSlice";

import { Dna } from "react-loader-spinner";
import { MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
import TitleCard from "../../components/Cards/TitleCard";
import { useBannersQuery } from "../../services/bannerApi";
// import CardsContainer from "../../components/Cards/CardsContainer";
import BannerTable from "./components/BannerTable";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewCategoryModal = () => {
    dispatch(
      openModal({
        title: "Add New Banner",
        bodyType: MODAL_BODY_TYPES.BANNER_ADD_NEW,
      })
    );
  };

  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewCategoryModal()}
      >
        Add New Banner
      </button>
    </div>
  );
};

function Banner() {
  // const { leads } = useSelector(state => state.lead)

  const { data: banners, isLoading, isSuccess} = useBannersQuery();

  return (
    <>
      <TitleCard
        title="Current Banners"
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
          <BannerTable title="banner" data={banners?.results}/>
        )}
        {/* {isSuccess && (
          <CardsContainer title={"banner"} data={banners.results} />
        )} */}
      </TitleCard>
    </>
  );
}

export default Banner;
