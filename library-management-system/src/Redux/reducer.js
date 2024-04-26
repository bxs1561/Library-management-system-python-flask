import { combineReducers } from 'redux';
import * as actions from './action'

const initialState = {
    user: null,
    isLoading: false, 
    error: null,
    searchTerm:'',
    books:[],   
    checkoutBook:[],
  };

const addUserReducer = (state = initialState, action) => {
    switch(action.type){
      case actions.ADDUSER_REQUEST:
        return{
          ...state, isLoading: true
        }
      case actions.ADDUSER_SUCCESS:
        return{
          ...state, isLoading: false, user:action.payload
        }
      case actions.ADDUSER_FAILURE:
        return{
          ...state, isLoading: false, error:action.payload
        }
      default:
        return state;

    }
}

const loginReducer = (state = initialState, action) => {
  switch(action.type){
    case actions.LOGIN_REQUEST:
      return{
        ...state, isLoading: true
      }
    case actions.LOGIN_SUCCESS:
      return{
        ...state, isLoading: false, user:action.payload
      }
    case actions.LOGIN_FAILURE:
      return{
        ...state, isLoading: false, error:action.payload
      }
    default:
      return state;

  }
}

const deleteUserReducer = (state=initialState,action)=>{
  switch(action.type){
    case 'DELETE_USER_REQUEST':
      return{
        ...state,
        isLoading: true,
      }
    case 'DELETE_USER_SUCCESS':
      return{
        ...state,
        isLoading: false,
        // user: state.user.filter(usr => usr.user_id !== action.payload)
        user: state.user ? state.user.filter(usr => usr.user_id !== action.payload) : null,
      }
    case 'DELETE_USER_FAILURE':
      return{
        ...state,
        isLoading: false,
        error: action.payload

      }
    default:
      return state;
  }
}

const getUserReducer=(state=initialState,action)=>{
  switch(action.type){
    case 'GET_USER_REQUEST':
      return{
        ...state,
        isLoading:true
      }
    case 'GET_USER_SUCCESS':
      return{
        ...state,
        user: action.payload,
        isLoading:false
      }
    case 'UPDATE_FILTERED_USER':
      return{
        ...state,
        user: action.payload,
        isLoading: false
      }
    case 'GET_USER_FAILURE':
      return{
        ...state,
        isLoading:false,
        error:action.payload
      }
      default:
        return state;

  }
}

const editUserReducer=(state=initialState,action)=>{
  switch(action.type){
    case 'EDIT_USER_REQUEST':
      return{
        ...state,
        isLoading:true
      }
    case 'EDIT_USER_SUCCESS':
      return{
        ...state,
        user: action.payload,
        isLoading:false
      }
    case 'EDIT_USER_FAILURE':
      return{
        ...state,
        isLoading:false,
        error:action.payload
      }
      default:
        return state;

  }
}


const addBookReducer=(state=initialState,action)=>{
  switch(action.type){
    case 'ADD_BOOK_REQUEST':
      return{
        ...state,
        isLoading:true
      }
    case 'ADD_BOOK_SUCCESS':
      return{
        ...state,
        books: action.payload,
        isLoading:false
      }
    case 'ADD_BOOK_FAILURE':
      return{
        ...state,
        isLoading:false,
        error:action.payload
      }
      default:
        return state;

  }
}

const getCheckoutBookReducer=(state=initialState,action)=>{
  switch(action.type){
    case 'GET_CHECKOUT_REQUEST':
      return{
        ...state,
        isLoading:true
      }
    case 'GET_CHECKOUT_SUCCESS':
      return{
        ...state,
        checkoutBook: action.payload,
        isLoading:false
      }
    case 'GET_CHECKOUT_FAILURE':
      return{
        ...state,
        isLoading:false,
        error:action.payload
      }
      default:
        return state;

  }
}

const getBookReducer=(state=initialState,action)=>{
  switch(action.type){
    case 'GET_BOOK_REQUEST':
      return{
        ...state,
        isLoading:true
      }
    case 'GET_BOOK_SUCCESS':
      return{
        ...state,
        book: action.payload,
        isLoading:false
      }
    case 'getBookFailure':
      return{
        ...state,
        isLoading:false,
        error:action.payload
      }
      default:
        return state;

  }
}

const addCheckoutBookReducer=(state=initialState,action)=>{
  switch(action.type){
    case 'ADD_BOOK_CHECKOUT_REQUEST':
      return{
        ...state,
        isLoading:true
      }
    case 'ADD_BOOK_CHECKOUT_SUCCESS':
      return{
        ...state,
        checkoutBook: action.payload,
        isLoading:false
      }
    case 'ADD_BOOK_CHECKOUT_FAILURE':
      return{
        ...state,
        isLoading:false,
        error:action.payload
      }
      default:
        return state;

  }
}




const reducer = combineReducers({
    user: addUserReducer,
    login: loginReducer,
    deleteUser: deleteUserReducer,
    getUser:getUserReducer,
    editUser: editUserReducer,
    addBook: addBookReducer,
    checkoutBooks: getCheckoutBookReducer,
    getBook: getBookReducer,
    addCheckoutBook: addCheckoutBookReducer,
});
  

export default reducer;
