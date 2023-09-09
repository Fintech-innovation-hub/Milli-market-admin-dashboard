import React from 'react';
import ProposalDetail from '../../proposalDetail/ProposalDetail';
import { Dna } from 'react-loader-spinner';
import { useProposalItemQuery } from '../../../services/proposalApi';

function OffcanvasBodyRightDrawerProposal({ proposal }) {
  const {
    data: proposalDetail,
    isSuccess,
    isLoading,
  } = useProposalItemQuery(proposal?.id);

  return (
    <div className='py-5'>
      {isLoading && (
        <div className="w-full flex pt-24 h-screen justify-center bg-slate-100 bg-opacity-30">
          <Dna
            visible={true}
            height="200"
            width="200"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      )}
      {isSuccess && (
        <ProposalDetail
          proposal={proposal}
          proposalDetail={proposalDetail?.data}
        />
      )}
    </div>
  );
}

export default OffcanvasBodyRightDrawerProposal;
