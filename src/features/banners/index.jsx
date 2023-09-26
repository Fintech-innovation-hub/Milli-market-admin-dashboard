import { useDispatch, useSelector } from "react-redux"
// import TitleCard from "../../components/Cards/TitleCard"
import { openModal } from "../common/modalSlice"
// import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
// import { showNotification } from '../common/headerSlice'
// import { useCategoriesQuery, useDeleteCategoryMutation } from "../../services/categoryApi"
import { useNavigate } from "react-router-dom";
import { Dna } from 'react-loader-spinner';
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
import TitleCard from "../../components/Cards/TitleCard";
import { useCategoriesQuery } from "../../services/categoryApi";


const TopSideButtons = () => {

    const dispatch = useDispatch()

    const openAddNewCategoryModal = () => {
        dispatch(openModal({ title: "Add New Category", bodyType: MODAL_BODY_TYPES.CATEGORY_ADD_NEW }))
    }

    return (
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewCategoryModal()}>Add New Category</button>
        </div>
    )
}

function Banners() {

    // const { leads } = useSelector(state => state.lead)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { data: categories, isLoading, isSuccess, isError } = useCategoriesQuery()
    // const [deleteCategory] = useDeleteCategoryMutation()
    // useEffect(() => {
    //     // dispatch(getLeadsContent())
    // }, [])



    const getDummyStatus = (index) => {
        if (index % 5 === 0) return <div className="badge">Not Interested</div>
        else if (index % 5 === 1) return <div className="badge badge-primary">In Progress</div>
        else if (index % 5 === 2) return <div className="badge badge-secondary">Sold</div>
        else if (index % 5 === 3) return <div className="badge badge-accent">Need Followup</div>
        else return <div className="badge badge-ghost">Open</div>
    }

    const deleteCurrentCategory = (id) => {
        dispatch(openModal({
            title: "Confirmation", bodyType: MODAL_BODY_TYPES.CONFIRMATION,
            extraObject: { message: `Are you sure you want to delete this category?`, type: CONFIRMATION_MODAL_CLOSE_TYPES.CATEGORY_DELETE, id },
        }))
    }
    const getCategoryDetailHandler = (id) => {
        navigate(`/app/categories/${id}`)
    }
    return (
        <>
            <TitleCard title="Current Banners" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
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
               
            </TitleCard>
        </>
    )
}


export default Banners