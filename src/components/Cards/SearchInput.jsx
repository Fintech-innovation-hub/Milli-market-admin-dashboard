import React, { useState, useEffect, useRef } from 'react';
import { baseUrl } from '../../constants';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { searchProposals } from '../../features/proposals/proposalSlice';

function SearchInput() {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const refs = useRef(false);

  useEffect(() => {
    if (!refs.current) {
      refs.current = true;
    } else {
      axios
        .get(`${baseUrl}/v1/proposal/?q=${query}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem('access-token')
            )}`,
          },
        })
        .then((res) => dispatch(searchProposals(res.data?.data)));
    }
  }, [query]);
  return (
    <input
      className="min-w-80 w-1/2 border border-slate-400 rounded outline-none px-2 py-1"
      type="text"
      placeholder="search"
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export default SearchInput;
