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
import { useUpdateProposalMutation } from '../../../services/proposalApi';

function ProposalsTableRow({
  first_name,
  id,
  last_name,
  index,
  company_name,
  company_type,
  phone_number,
  status,
  pnfl,
  created_at,
  update_at,
  inn,
}) {
  const [statuss, setStatuss] = useState(status || '');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updatePost, { isLoading, isError, error, isSuccess }] =
    useUpdateProposalMutation();
  const handleChange = (e) => {
    setStatuss(e.target.value);
    updatePost({ id, status: e.target.value });
  };

  return (
    <tr className="hover:bg-slate-400 duration-500 cursor-pointer">
      <td>{index + 1}</td>
      <td>
        {last_name} {first_name}
      </td>
      <td>{phone_number}</td>
      <td>{company_name}</td>
      <td>{company_type}</td>
      <td>{inn ? `INN: ${inn} ` : `PNFL: ${pnfl}`}</td>
      <td>{formatDate(created_at)}</td>
      <td>{formatDate(update_at)}</td>
      <td className="relative">
        <select
          value={statuss}
          onChange={handleChange}
          className="cursor-pointer outline-none rounded px-2 py-1"
          name="status"
          id="status"
        >
          <option value="new">new</option>
          <option value="accepted">accepted</option>
          <option value="rejected">rejected</option>
        </select>
      </td>
    </tr>
  );
}

export default ProposalsTableRow;
