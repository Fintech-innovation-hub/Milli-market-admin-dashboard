import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_CLOSE_TYPES } from '../../../utils/globalConstantUtil'
import { deleteLead } from '../../categories/leadSlice'
import { showNotification } from '../headerSlice'
import { useDeleteCategoryMutation } from "../../../services/categoryApi"


function ConfirmationModalBody({ extraObject, closeModal}) {
    const [deleteCategory] = useDeleteCategoryMutation()


    const dispatch = useDispatch()

    const { message, type, id, index } = extraObject


    const proceedWithYes = async () => {
        if (type === CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE) {
            // positive response, call api or dispatch redux function
            dispatch(deleteLead({ index }))
            dispatch(showNotification({ message: "Category Deleted!", status: 1 }))
            deleteCategory(id)
        }
        closeModal()
    }

    return (
        <>
            <p className=' text-xl mt-8 text-center'>
                {message}
            </p>

            <div className="modal-action mt-12">

                <button className="btn btn-outline   " onClick={() => closeModal()}>Cancel</button>

                <button className="btn btn-primary w-36" onClick={() => proceedWithYes()}>Yes</button>

            </div>
        </>
    )
}

export default ConfirmationModalBody