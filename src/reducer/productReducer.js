import { ADD_ATTRIBUTE, ADD_PROPERTY } from "./productType";

const initialValue = {
  title_ln: '',
  title_ru: '',
  attributes_ln: {},
  attributes_ru: {},
  description_ln: '',
  description_ru: '',
  category: 1515,
  country: 1,
  brand:1,
  model: 1,
  seller: 2,
  characteristics: [
    { id: 1, values: [2, 4] }
  ],

};
const productReducer = (state, action) => {
  switch (action.type) {
    case ADD_ATTRIBUTE:
      const updated = Object.keys(action.payload).reduce((st, attr) => {
        st[attr][Object.keys(st[attr]).length] = action.payload[attr];
        return st;
      }, state);

      return {
        ...state,
        ...updated,
      };
    case ADD_PROPERTY:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
};

export { productReducer, initialValue };