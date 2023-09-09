import React, { useState } from 'react';
import { useUpdateProposalMutation } from '../../services/proposalApi';
import { useDispatch } from 'react-redux';
import { changeStatus } from '../../features/proposals/proposalSlice';
import { useNavigate } from 'react-router-dom';

function ProposalDetail({ proposal, proposalDetail }) {
  console.log(proposalDetail);
  console.log(proposal);
  const companies = {
    family_company: 'Oilaviy korxona',
    family_business: 'Oilaviy tadbirkorlik',
    yatt: 'YaTT',
    mchj: 'MCHJ',
    personal_business: 'Yakka tadbirkorlik',
  };
  const [statuss, setStatuss] = useState(proposal?.status || '');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [updatePost, { isLoading, isError, error, isSuccess }] =
    useUpdateProposalMutation();

  const handleChange = (e) => {
    setStatuss(e.target.value);
    updatePost({ id: proposal?.id, status: e.target.value });
    dispatch(changeStatus({ id: proposal?.id, status: e.target.value }));
  };
  return (
    <div className="flex flex-col gap-3 items-start text-[18px]">
      <h1>
        So'rov yuboruvchi:{' '}
        <b className="capitalize"> {`${proposal?.last_name} ${proposal?.first_name}` || 'Mavjud emas'}</b>
      </h1>

      <h1>
        Kompaniya nomi:{' '}
        <b> {proposalDetail?.json_data?.fullname || proposalDetail?.json_data?.fullName }</b>
      </h1>
      <h1>
        Inn: <b> {proposalDetail?.inn || 'Mavjud emas'}</b>
      </h1>
    
      <h1>
        Tel:
        <b> {proposalDetail?.phone_number || 'Mavjud emas'}</b>
      </h1>
      <h1>
        Created at:
        <b> {proposalDetail?.created_at || 'Mavjud emas'}</b>
      </h1>
      <h1>
        Xisob raqam:
        <b> {proposalDetail?.json_data?.bankAccount || 'Mavjud emas'}</b>
      </h1>
      <h1>
        Bank id:
        <b> {proposalDetail?.json_data?.bankId || 'Mavjud emas'}</b>
      </h1>
      <h1>
        MFO:
        <b> {proposalDetail?.json_data?.mfo || 'Mavjud emas'}</b>
      </h1>
      <h1>
        Direktor:
        <b> {proposalDetail?.json_data?.director || 'Mavjud emas'}</b>
      </h1>
      <h1>
        Adress:
        <b> {proposalDetail?.json_data?.address || 'Mavjud emas'}</b>
      </h1>
      <h1>
        Status:
        <b>{proposalDetail?.status || 'Mavjud emas'}</b>
      </h1>
      <div className="flex items-start gap-4">
        <label htmlFor="">Change Status:</label>
        <select
          value={statuss}
          onChange={handleChange}
          className="cursor-pointer border border-slate-400 outline-none rounded px-2 py-1"
          name="status"
          id="status"
        >
          <option value="new">new</option>
          <option value="accepted">accepted</option>
          <option value="rejected">rejected</option>
        </select>
      </div>
    </div>
  );
}

export default ProposalDetail;
