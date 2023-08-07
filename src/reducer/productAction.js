import { ADD_ATTRIBUTE, ADD_PROPERTY } from "./productType";


const addAttribute = (attribute) => {
  return {
    type: ADD_ATTRIBUTE,
    payload: attribute
  }
}
const addProperty = (property) => {
  return {
    type: ADD_PROPERTY,
    payload: property
  }
}
export { addAttribute, addProperty }