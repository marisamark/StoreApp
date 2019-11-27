import React, { createContext, useReducer, useContext } from "react";
import {
  SET_CURRENT_PRODUCT,
  REMOVE_PRODUCT, //why is this needed?
  UPDATE_PRODUCTS,
  ADD_PRODUCT,//why is this needed?
  ADD_TO_CART,
  ADD_ALL_TO_CART,
  UPDATE_CART,
  REMOVE_FROM_CART,
  LOADING
} from "./actions";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case SET_CURRENT_PRODUCT:
      return {
        ...state,
        currentProduct: action.product,
        loading: false
      }
    //get the info from dispatch in detail.js
    case ADD_ALL_TO_CART:
      return {
        ...state,
        cart: action.cart,
        loading: false
      }
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.product],
        loading: false
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.productId)
      }
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: action.products,
        loading: false
      }
    case UPDATE_CART:
      return {
        ...state,
        cart: state.cart,
        loading: false
      }
   
    case LOADING:
      return {
        ...state,
        loading: true
      } 
    default:
      return state;
  }

};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    products: [],
    currentProduct: {
      _id: 0,
      title: "",
      body: "",
      author: ""
    },
    cart: [],
    loading: false
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
