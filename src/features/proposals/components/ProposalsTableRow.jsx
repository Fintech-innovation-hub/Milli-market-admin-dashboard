import React, { useState, useEffect } from 'react';
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from '../../../utils/globalConstantUtil';
import { useNavigate } from 'react-router-dom';

import TrashIcon from '@heroicons/react/24/outline/TrashIcon';

import { useDispatch } from 'react-redux';
import DropdownStatus from './DropdownStatus';
import { formatDate } from '../../../utils/formatDate';
import { changeStatus } from '../proposalSlice';
import { openRightDrawer } from '../../../features/common/rightDrawerSlice';
import { RIGHT_DRAWER_TYPES } from '../../../utils/globalConstantUtil';
function ProposalsTableRow({
  first_name,

  last_name,
  index,
  phone_number,
  pnfl,
  created_at,

  inn,
  proposal,
}) {
  const dispatch = useDispatch();

  const openRightOffcanvas = () => {
    dispatch(
      openRightDrawer({
        header: 'Proposal details',
        bodyType: RIGHT_DRAWER_TYPES.OFFCANVASPROPOSAL,
        size: 'long',
        extraObject: { proposal },
      })
    );
  };

  return (
    <tr
      onClick={() => openRightOffcanvas()}
      className="hover:bg-slate-400 duration-500 cursor-pointer"
    >
      <td>{index + 1}</td>
      <td>
        {last_name} {first_name}
      </td>
      <td>{phone_number}</td>
      <td>{inn ? `INN: ${inn} ` : `PNFL: ${pnfl}`}</td>
      <td>{formatDate(created_at)}</td>
    </tr>
  );
}

export default ProposalsTableRow;
