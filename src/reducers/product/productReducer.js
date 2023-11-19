import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_BY_FABRIC_ID,
  PRODUCT_LOADING,
  PRODUCT_FAILURE,
} from "./productActions";
import { FIRST_OPEN } from "./checkFirstTimeActions";

const initialState = {
  products: [],
  pruductsByFabricId: [],
  isFirstOpen: false,
  isLoading: false,
};
export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case PRODUCT_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
        isLoading: false,
      };
    case FETCH_PRODUCTS_BY_FABRIC_ID:
      return {
        ...state,
        pruductsByFabricId: [...action.pruductsByFabricId],
        isLoading: false,
      };
    case FIRST_OPEN: {
      return {
        ...state,
        isFirstOpen: true,
      };
    }
    default:
      return state;
  }
};
