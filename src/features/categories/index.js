import moment from "moment"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { openModal } from "../common/modalSlice"
import { deleteLead, getLeadsContent } from "./leadSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import { showNotification } from '../common/headerSlice'
import { useCategoriesQuery } from "../../services/categoryApi"
import { useNavigate } from "react-router-dom";
import { Dna } from 'react-loader-spinner';


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

function Categories() {

    // const { leads } = useSelector(state => state.lead)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { data: categories, isLoading, isSuccess, isError } = useCategoriesQuery()

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
            extraObject: { message: `Are you sure you want to delete this category?`, type: CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE, id },
        }))
    }
    const getCategoryDetailHandler = (id) => {
        navigate(`/app/categories/${id}`)
    }
    return (
        <>
            <TitleCard title="Current Categories" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
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
                {/* Categories List in table format loaded from slice after api call */}
                {isSuccess && categories.status &&
                    <div className="overflow-x-auto w-full">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Title uz</th>

                                    {/* <th>Assigned To</th>
                                <th></th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    categories.data.map((category, index) => {
                                        return (
                                            <tr className="hover:bg-slate-400 duration-500 cursor-pointer" key={category.id}>
                                                <td  >
                                                    {index + 1}
                                                    {/* <div className="flex items-center space-x-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={l.avatar} alt="Avatar" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{l.first_name}</div>
                                                        <div className="text-sm opacity-50">{l.last_name}</div>
                                                    </div>
                                                </div> */}
                                                </td>
                                                <td onClick={() => getCategoryDetailHandler(category.id)}>{category.title}</td>
                                                {/* <td>{moment(new Date()).add(-5 * (index + 2), 'days').format("DD MMM YY")}</td> */}
                                                {/* <td>{getDummyStatus(k)}</td> */}

                                                <td><button className="btn btn-square btn-ghost" onClick={() => deleteCurrentCategory(category.id)}><TrashIcon className="w-5" /></button></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                }
            </TitleCard>
        </>
    )
}


export default Categories