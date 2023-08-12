import { createSlice } from '@reduxjs/toolkit';

export const characterSlice = createSlice({
  name: 'character',
  initialState: {
    allCharItems: [],
  },
  reducers: {
    addNewCharItems: (state, action) => {
      state.allCharItems = action.payload
    },
    checkedCharItem:(state,action)=>{
      const checked=state.allCharItems.map((elem) => {
        return elem.id === Number(action.payload.id)
          ? { ...elem, checked: action.payload.checked }
          : elem;
      })
      state.allCharItems=checked
    },
    deleteCharItem:(state,action)=>{
      const deleted=state.allCharItems.map((elem) => {
        return elem.id === action.payload.id
          ? { ...elem, checked: false }
          : elem;
      })
      state.allCharItems=deleted
    }
  },
});

export const {
  addNewCharItems,
  deleteCharItem,
  checkedCharItem,

} = characterSlice.actions;

export default characterSlice.reducer;
