import { createSlice } from '@reduxjs/toolkit';

export const proposalSlice = createSlice({
  name: 'proposal',
  initialState: {
    proposals: [],
    status: 'all',
  },
  reducers: {
    addProposals: (state, action) => {
      state.proposals = action.payload;
    },
    filterProposals: (state, action) => {
      state.status = action.payload;
    },
    searchProposals: (state, action) => {
      state.proposals = action.payload;
    },
    changeStatus: (state, action) => {
      const changed = state.proposals.map((item) => {
        return item.id === action.payload.id
          ? { ...item, status: action.payload.status }
          : item;
      });
      state.proposals = changed;
    },
  },
});

export const { addProposals, filterProposals, searchProposals, changeStatus } =
  proposalSlice.actions;

export default proposalSlice.reducer;
