import { IS_ERROR, IS_LOADING, IS_SUCCESS } from "./type";

export const isLoadingAction = () => {
  return {
    type: IS_LOADING,
  };
};
export const isSuccessAction = () => {
  return {
    type: IS_SUCCESS,
  };
};
export const isErrorAction = () => {
  return {
    type: IS_ERROR,
  };
};
