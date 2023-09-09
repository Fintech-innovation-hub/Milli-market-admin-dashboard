import React from 'react';
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from '../../../utils/globalConstantUtil';
import { useNavigate } from 'react-router-dom';

import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import { AiFillEdit } from 'react-icons/ai';

import { useDispatch } from 'react-redux';

import { openModal } from '../../common/modalSlice';
import { useDeleteProductMutation } from '../../../services/productApi';
import { openRightDrawer } from '../../../features/common/rightDrawerSlice';
import { RIGHT_DRAWER_TYPES } from '../../../utils/globalConstantUtil';

function ProductTableRow({
  product,
  title,
  id,
  index,
  seller_name,
  category_name,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteCurrentProduct = async (event) => {

    event.stopPropagation(); 
    dispatch(
      openModal({
        title: 'Confirmation',
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this product?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.PRODUCT_DELETE,
          id,
        },
      })
    );
  };
  function sliceStr(str = '') {
    return str.length > 15 ? str.slice(0, 35) + '...' : str;
  }
  const editCurrentProduct = (event) => {
    event.stopPropagation(); 
    navigate(`/app/product/${id}/sku`);
  };

  const openRightOffcanvas = () => {
    dispatch(
      openRightDrawer({
        header: title,
        bodyType: RIGHT_DRAWER_TYPES.OFFCANVAS,
        size: 'long',
        extraObject: { product},
      })
    );
  };
  return (
    <>
      <tr
        onClick={() => openRightOffcanvas()}
        className="hover:bg-slate-400 duration-500 cursor-pointer"
      >
        <td>{index + 1}</td>
        <td>{title}</td>
        <td>{seller_name}</td>
        <td>{sliceStr(category_name)}</td>
        <td>
          <button
            className="btn btn-square btn-ghost"
            onClick={deleteCurrentProduct}
          >
            <TrashIcon className="w-5" />
          </button>
          <button
            className="btn btn-square btn-ghost"
            onClick={editCurrentProduct}
          >
            <AiFillEdit className="text-2xl" />
          </button>
        </td>
      </tr>
    </>
  );
}

export default ProductTableRow;
