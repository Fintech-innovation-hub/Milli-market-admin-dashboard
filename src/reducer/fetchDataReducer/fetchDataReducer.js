import { IS_ERROR, IS_LOADING, IS_SUCCESS } from "./type";

export const initStateFetchData = {
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const fetchDataReducer = (state, action) => {
  switch (action.type) {
    case IS_LOADING:
      return (state = {
        ...state,
        isLoading: true,
      });
    case IS_SUCCESS:
      return (state = {
        ...state,
        isLoading: false,
        isSuccess: true,
      });
    case IS_ERROR:
      return (state = {
        isLoading: false,
        isSuccess: false,
        isError: true,
      });

    default:
      return state;
  }
};
