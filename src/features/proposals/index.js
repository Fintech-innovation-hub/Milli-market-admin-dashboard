
import TitleCard from '../../components/Cards/TitleCard';
import { Dna } from 'react-loader-spinner'
import ProposalsTable from './components/ProposalsTable';
import { useProposalsQuery } from '../../services/proposalApi';




function Proposals() {

  const { data: proposals, isLoading, isSuccess, isError } = useProposalsQuery();
  return (
    <>
      <TitleCard
        title="Current Proposals"
        topMargin="mt-2"
        name="proposal"
      >
        <div className="overflow-x-auto w-full">
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
          {isSuccess && <ProposalsTable proposals={proposals?.data} />}
        </div>
      </TitleCard>
    </>
  );
}

export default Proposals;
