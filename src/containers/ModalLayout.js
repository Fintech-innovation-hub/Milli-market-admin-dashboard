import { MODAL_BODY_TYPES } from '../utils/globalConstantUtil'
import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from '../features/common/modalSlice'
import AddCategoryModalBody from '../features/categories/components/AddCategoryModalBody'
import ConfirmationModalBody from '../features/common/components/ConfirmationModalBody'
import AddProductModalBody from '../features/products/components/AddProductModalBody'
import SelectCharacterItemsModalBody from '../features/products/components/CharacteristicsSection/SelectCharacterItemsModalBody'


function ModalLayout(){


    const {isOpen, bodyType, size, extraObject, title} = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const close = (e) => {
        dispatch(closeModal(e))
    }



    return(
        <>
        {/* The button to open modal */}

            {/* Put this part before </body> tag */}
            <div className={`modal ${isOpen ? "modal-open" : ""}`}>
            <div className={`modal-box   ${size === 'lg' ? 'max-w-6xl' : ''}`}>
                <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => close()}>✕</button>
                <h3 className="font-semibold text-xl pb-4 text-center">{title}</h3>


                {/* Loading modal body according to different modal type */}
                {
                    {
                             [MODAL_BODY_TYPES.CATEGORY_ADD_NEW] : <AddCategoryModalBody closeModal={close} size={size} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.PRODUCT_ADD_NEW] : <AddProductModalBody size={size}  closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.SELECT_CHARACTER_ITEMS] : <SelectCharacterItemsModalBody size={size}  closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.CONFIRMATION] : <ConfirmationModalBody extraObject={extraObject} closeModal={close}/>,
                             [MODAL_BODY_TYPES.DEFAULT] : <div></div>
                    }[bodyType]
                }
            </div>
            </div>
            </>
    )
}

export default ModalLayout