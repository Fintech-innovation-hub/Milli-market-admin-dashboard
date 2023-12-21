// import React, { useState, useEffect } from 'react';
// import {
//   CONFIRMATION_MODAL_CLOSE_TYPES,
//   MODAL_BODY_TYPES,
// } from '../../../utils/globalConstantUtil';
// import { useNavigate } from 'react-router-dom';

import { formatDate } from "../../../utils/formatDate";
import { formatPrice } from "../../../utils/priceFormatter";

// import TrashIcon from '@heroicons/react/24/outline/TrashIcon';

// import { useDispatch } from 'react-redux';
// import DropdownStatus from './DropdownStatus';
// import { formatDate } from '../../../utils/formatDate';
// import { changeStatus } from '../proposalSlice';
// import { openRightDrawer } from '../../../features/common/rightDrawerSlice';
// import { RIGHT_DRAWER_TYPES } from '../../../utils/globalConstantUtil';

function OrdersTableRaw({
    user,
    status,
    index,
    id,
    image,
    product,
    price,
    created_at,
    quantity
}) {
    

    return (
        <tr
            //   onClick={() => openRightOffcanvas()}
            className="hover:bg-slate-400 duration-500 cursor-pointer"
        >
            <td>{index + 1}</td>
            <td className="flex items-center justify-center">
                <img className="h-16 w-16 object-cover" src={image} alt={product?.title_ln} />
            </td>
            <td>
                {product?.title_ln}
            </td>
            <td>
                {formatPrice(price)}
            </td>
            <td>
                {quantity}
            </td>
            <td>{formatDate(created_at)}</td>
            <td>
                {user?.last_name} {user?.first_name}
            </td>
            <td>{user?.phone}</td>
            <td>{status}</td>
        </tr>
    );
}

export default OrdersTableRaw;
