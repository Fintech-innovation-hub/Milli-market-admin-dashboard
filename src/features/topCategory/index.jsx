import { useDispatch} from "react-redux"
import { openModal } from "../common/modalSlice"
import { Dna } from 'react-loader-spinner';
import {  MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
import TitleCard from "../../components/Cards/TitleCard";
import { useTopCategoriesQuery } from "../../services/topCategoryApi";
import CardsContainer from "../../components/Cards/CardsContainer";
import TopCategoryTable from "./components/TopCategoryTable"


const TopSideButtons = () => {

    const dispatch = useDispatch()

    const openAddNewCategoryModal = () => {
        dispatch(openModal({ title: "Add Top Category", bodyType: MODAL_BODY_TYPES.TOP_CATEGORY_ADD_NEW }))
    }

    return (
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={openAddNewCategoryModal}>Add Top Category</button>
        </div>
    )
}

function TopCategory() {

   
    const { data: topCategories, isLoading, isSuccess } = useTopCategoriesQuery()
  console.log(topCategories)
  
    return (
        <>
            <TitleCard title="Top Categories" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
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
                  {isSuccess && <TopCategoryTable title={"topCategory"} data={topCategories.results} />}
               {/* {isSuccess && <CardsContainer title={"topCategory"} data={topCategories.results}/>} */}
            </TitleCard>
        </>
    )
}


export default TopCategory