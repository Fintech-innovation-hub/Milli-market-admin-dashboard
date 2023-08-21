import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProposals } from '../proposalSlice';
import ProposalsTableRow from './ProposalsTableRow';

function ProposalsTable({ proposals }) {
  const dispatch = useDispatch();
  const proposalsData = useSelector((state) => state.proposal.proposals);
  const status = useSelector((state) => state.proposal.status);
  useEffect(() => {
    if (status === 'all') {
      dispatch(addProposals(proposals));
    } else {
      const filtered = proposals?.filter((item) => item.status === status);
      dispatch(addProposals(filtered));
    }
  }, [status]);
  

  return (
    <table className="bg-blue-400 w-full product-table">
      <thead>
        <tr>
          <th>№</th>
          <th>F.I</th>
          <th>Tel raqam</th>
          <th>Korxona nomi</th>
          <th>Korxona turi</th>
          <th>Inn / Pnfl</th>
          <th>Created </th>
          <th>Last updated</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {proposalsData?.map((proposal, index) => (
          <ProposalsTableRow key={proposal.id} index={index} proposal={proposal} {...proposal} />
        ))}
      </tbody>
    </table>
  );
}

export default ProposalsTable;
