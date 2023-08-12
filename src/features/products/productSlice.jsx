import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    chosenCharacteristics: [],
  },
  reducers: {
    clearCharacters:(state)=>{
      state.chosenCharacteristics=[]
    },
    addNewCharacteristic: (state, action) => {
      state.chosenCharacteristics = [
        ...state.chosenCharacteristics,
        action.payload,
      ];
    },
    addChosenValuesToCharacter: (state, action) => {
      const addChosenValues = state.chosenCharacteristics.map((item) => {
        return item.charId === action.payload.id
          ? { ...item, chosenValues: action.payload.values }
          : item;
      });
      state.chosenCharacteristics = addChosenValues;
    },
    filterCharacteristicValues: (state, action) => {
      let filtered = state.chosenCharacteristics.filter(
        (item) => item.values > 0
      );
      state.chosenCharacteristics = filtered;
    },
    deleteCharacter: (state, action) => {
      let filtered = state.chosenCharacteristics.filter(
        (item) => item.charId !== action.payload
      );

      state.chosenCharacteristics = filtered;
    },
    deleteCharacterItem: (state, action) => {
      const deletedItems = state.chosenCharacteristics.map((item) => {
        return {
          ...item,
          chosenValues: item.chosenValues.filter(
            (elem) => elem.id !== action.payload
          ),
        };
      });
      state.chosenCharacteristics = deletedItems;
    },
  },
});

export const {
  clearCharacters,
  addNewCharacteristic,
  deleteCharacter,
  filterCharacteristicValues,
  addChosenValuesToCharacter,
  deleteCharacterItem,
} = productSlice.actions;

export default productSlice.reducer;
