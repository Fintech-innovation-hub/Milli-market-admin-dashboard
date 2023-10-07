import { useDispatch } from "react-redux";

import { CONFIRMATION_MODAL_CLOSE_TYPES } from "../../../utils/globalConstantUtil";

import { showNotification } from "../headerSlice";
import { useDeleteCategoryMutation } from "../../../services/categoryApi";
import { useDeleteProductMutation } from "../../../services/productApi";
import { useDeleteTopCategoryMutation } from "../../../services/topCategoryApi";
import { useDeleteTopProductMutation } from "../../../services/topProductApi";
import { useDeleteBannerMutation } from "../../../services/bannerApi";
import { useDeleteAdsProductMutation } from "../../../services/adsProductApi";

function ConfirmationModalBody({ extraObject, closeModal }) {
  const [deleteCategory] = useDeleteCategoryMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [deleteTopCategory] = useDeleteTopCategoryMutation();
  const [deleteTopProduct] = useDeleteTopProductMutation();
  const [deleteAdsProduct] = useDeleteAdsProductMutation();
  const [deleteBanner] = useDeleteBannerMutation();

  const dispatch = useDispatch();

  const { message, type, id } = extraObject;

  const proceedWithYes = async () => {
    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.CATEGORY_DELETE) {
      dispatch(showNotification({ message: "Category Deleted!", status: 1 }));
      deleteCategory(id);
    }

    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.PRODUCT_DELETE) {
      dispatch(showNotification({ message: "Product Deleted!", status: 1 }));
      deleteProduct(id);
    }
    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.TOP_CATEGORY_DELETE) {
      dispatch(
        showNotification({ message: "Top Category Deleted!", status: 1 })
      );
      deleteTopCategory(id);
    }
    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.TOP_PRODUCT_DELETE) {
      dispatch(
        showNotification({ message: "Top Product Deleted!", status: 1 })
      );
      extraObject?.pageTitle === "Ads Product"
        ? deleteAdsProduct(id)
        : deleteTopProduct(id);
    }
    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.BANNER_DELETE) {
      dispatch(showNotification({ message: "Banner Deleted!", status: 1 }));
      deleteBanner(id);
    }

    closeModal();
  };

  return (
    <>
      <p className=" text-xl mt-8 text-center">{message}</p>

      <div className="modal-action mt-12">
        <button className="btn btn-outline   " onClick={() => closeModal()}>
          Cancel
        </button>

        <button
          className="btn btn-primary w-36"
          onClick={() => proceedWithYes()}
        >
          Yes
        </button>
      </div>
    </>
  );
}

export default ConfirmationModalBody;
