import React from 'react';
import { useDispatch } from 'react-redux';
import { filterProposals } from '../../features/proposals/proposalSlice';
function StatusSelect() {
  const dispatch = useDispatch();
  const filterPrososalsStatus = (e) => {
    dispatch(filterProposals(e.target.value));
  };
  return (
    <select
      onChange={filterPrososalsStatus}
      className="border border-slate-400 px-2 py-1 outline-none rounded cursor-pointer"
    >
      <option value="all">All</option>
      <option value="new">New</option>
      <option value="accepted">Accepted</option>
      <option value="rejected">Rejected</option>
    </select>
  );
}

export default StatusSelect;
