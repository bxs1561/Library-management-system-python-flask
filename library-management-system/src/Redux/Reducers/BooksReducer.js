import { combineReducers } from 'redux';
import * as actions from '../ActionTypes/BookActionTypes'

const initialState = {
    isLoading: false, 
    error: null,
    books:[],   
    checkoutBook:[],
  };


export const addBookReducer=(state=initialState,action)=>{
switch(action.type){
    case actions.ADD_BOOK_REQUEST :
    return{
        ...state,
        isLoading:true
    }
    case actions.ADD_BOOK_SUCCESS:
    return{
        ...state,
        books: action.payload,
        isLoading:false
    }
    case actions.ADD_BOOK_FAILURE:
    return{
        ...state,
        isLoading:false,
        error:action.payload
    }
    default:
        return state;
    }
}
export const deleteBookReducer=(state=initialState,action)=>{
    switch(action.type){
        case actions.DELETE_BOOK_REQUEST :
        return{
            ...state,
            isLoading:true
        }
        case actions.DELETE_BOOK_SUCCESS:
        return{
            ...state,
            books: state.books ? state.books.filter(book => book.book_id !== action.payload) : null,
            isLoading:false
        }
        case actions.DELETE_BOOK_FAILURE:
        return{
            ...state,
            isLoading:false,
            error:action.payload
        }
        default:
            return state;
        }
    }
export const getBookReducer=(state=initialState,action)=>{
switch(action.type){
    case actions.GET_BOOK_REQUEST:
    return{
        ...state,
        isLoading:true
    }
    case actions.GET_BOOK_SUCCESS:
    return{
        ...state,
        book: action.payload,
        isLoading:false
    }
    case actions.GET_BOOK_FAILURE:
    return{
        ...state,
        isLoading:false,
        error:action.payload
    }
    default:
        return state;
    }
}

export const getCheckoutBookReducer=(state=initialState,action)=>{
    switch(action.type){
      case actions.GET_CHECKOUT_REQUEST:
        return{
          ...state,
          isLoading:true
        }
      case actions.GET_CHECKOUT_SUCCESS:
        return{
          ...state,
          checkoutBook: action.payload,
          isLoading:false
        }
      case actions.GET_CHECKOUT_FAILURE:
        return{
          ...state,
          isLoading:false,
          error:action.payload
        }
        default:
          return state;
  
    }
  }

export const addCheckoutBookReducer=(state=initialState,action)=>{
    switch(action.type){
        case actions.ADD_BOOK_CHECKOUT_REQUEST:
        return{
            ...state,
            isLoading:true
        }
        case actions.ADD_BOOK_CHECKOUT_SUCCESS:
        return{
            ...state,
            checkoutBook: action.payload,
            isLoading:false
        }
        case actions.ADD_BOOK_CHECKOUT_FAILURE:
        return{
            ...state,
            isLoading:false,
            error:action.payload
        }
        default:
            return state;
        }
    }
  
  

// const BooksReducer = combineReducers({
//     addBook: addBookReducer,
// });
// export default BooksReducer
