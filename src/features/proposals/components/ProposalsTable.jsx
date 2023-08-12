import React from 'react';
import ProposalsTableRow from './ProposalsTableRow';

function ProposalsTable({ proposals }) {
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
        {proposals?.map((proposal, index) => (
          <ProposalsTableRow key={proposal.id} index={index} {...proposal} />
        ))}
      </tbody>
    </table>
  );
}

export default ProposalsTable;
