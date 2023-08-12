import React from 'react';
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from '../../../utils/globalConstantUtil';
import { useNavigate } from 'react-router-dom';

import TrashIcon from '@heroicons/react/24/outline/TrashIcon';

import { useDispatch } from 'react-redux';

function ProductTableRow({ title, id, index, seller_name, category_name }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deleteCurrentProduct = () => {
    // dispatch(
    //   openModal({
    //     title: 'Confirmation',
    //     bodyType: MODAL_BODY_TYPES.CONFIRMATION,
    //     extraObject: {
    //       message: `Are you sure you want to delete this product?`,
    //       type: CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE,
    //       id,
    //     },
    //   })
    // );
  };
  function sliceStr(str = '') {
    return str.length > 15 ? str.slice(0, 35) + '...' : str;
  }

  const getProductDetailHandler = () => {
    // navigate(`/app/categories/${id}`);
  };
  return (
    <tr className="hover:bg-slate-400 duration-500 cursor-pointer">
      <td>{index + 1}</td>
      <td onClick={getProductDetailHandler}>{title}</td>
      <td>{seller_name}</td>
      <td>{sliceStr(category_name)}</td>
      <td>
        <button
          className="btn btn-square btn-ghost"
          onClick={deleteCurrentProduct}
        >
          <TrashIcon className="w-5" />
        </button>
      </td>
    </tr>
  );
}

export default ProductTableRow;
