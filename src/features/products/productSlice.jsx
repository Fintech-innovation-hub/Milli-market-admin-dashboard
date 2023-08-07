import { createSlice } from '@reduxjs/toolkit';


export const productSlice = createSlice({
  name: 'product',
  initialState: {
    characteristics: [],
  },
  reducers: {
    addNewCharacteristic: (state, action) => {
     
      state.characteristics = [...state.characteristics,action.payload];
    },
  },
});

export const { addNewCharacteristic } = productSlice.actions;

export default productSlice.reducer;
