import { combineReducers } from 'redux';
import * as actions from '../actionTypes/userActionTypes'

const initialState = {
    user: null,
    isLoading: false, 
    error: null,
    log:[], 
    checkoutUserBook:[],  
    paymentMethod:null,
  };


export const addUserReducer = (state = initialState, action) => {
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

export const loginReducer = (state = initialState, action) => {
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
      case actions.USER_SIGNOUT:
        return{
          ...state,
          user:null
        }
    default:
      return state;

  }
}

export const getUserReducer=(state=initialState,action)=>{
    switch(action.type){
      case actions.GET_USER_REQUEST:
        return{
          ...state,
          isLoading:true
        }
      case actions.GET_USER_SUCCESS:
        return{
          ...state,
          user: action.payload,
          isLoading:false
        }
      case actions.UPDATE_FILTERED_USER:
        return{
            ...state,
            user: action.payload,
            isLoading: false
        }
      case actions.GET_USER_FAILURE:
        return{
          ...state,
          isLoading:false,
          error:action.payload
        }
        default:
          return state;
    }
}

export const deleteUserReducer = (state=initialState,action)=>{
  switch(action.type){
    case actions.DELETE_USER_REQUEST:
      return{
        ...state,
        isLoading: true,
      }
    case actions.DELETE_USER_SUCCESS:
      return{
        ...state,
        isLoading: false,
        // user: state.user.filter(usr => usr.user_id !== action.payload)
        user: state.user ? state.user.filter(usr => usr.user_id !== action.payload) : null,
      }
    case actions.DELETE_USER_FAILURE:
      return{
        ...state,
        isLoading: false,
        error: action.payload
      }
    default:
      return state;
  }
}

export const editUserReducer=(state=initialState,action)=>{
  switch(action.type){
    case actions.EDIT_USER_REQUEST:
      return{
        ...state,
        isLoading:true
      }
    case actions.EDIT_USER_SUCCESS:
      return{
        ...state,
        user: action.payload,
        isLoading:false
      }
    case actions.EDIT_USER_FAILURE:
      return{
        ...state,
        isLoading:false,
        error:action.payload
      }
      default:
        return state;
  }
}

export const getLogEventReducer=(state=initialState,action)=>{
  switch(action.type){
    case actions.GET_LOG_EVENTS_REQUEST:
      return{
        ...state,
        isLoading:true
      }
    case actions.GET_LOG_EVENTS_SUCCESS:
      return{
        ...state,
        log: action.payload,
        isLoading:false
      }
    case actions.GET_LOG_EVENTS_FAILURE:
      return{
        ...state,
        isLoading:false,
        error:action.payload
      }
      default:
        return state;

  }
}

export const getUserCheckoutReducer=(state=initialState,action)=>{
  switch(action.type){
    case actions.GET_USER_CHECKOUT_REQUEST:
      return{
        ...state,
        isLoading:true
      }
    case actions.GET_USER_CHECKOUT_SUCCESS:
      return{
        ...state,
        checkoutUserBook: action.payload,
        isLoading:false
      }
    case actions.GET_USER_CHECKOUT_FAILURE:
      return{
        ...state,
        isLoading:false,
        error:action.payload
      }
    case actions.SAVE_USER_PAYMENT_ACTION:
      return{
        ...state,
        isLoading:false,
        paymentMethod:action.payload
      }
      default:
        return state;
  }
}

export const getStudentReducer=(state=initialState,action)=>{
  switch(action.type){
    case actions.GET_STUDENT_REQUEST:
      return{
        ...state,
        isLoading:true
      }
    case actions.GET_STUDENT_SUCCESS:
      return{
        ...state,
        user: action.payload,
        isLoading:false
      }
    
    case actions.GET_STUDENT_FAILURE:
      return{
        ...state,
        isLoading:false,
        error:action.payload
      }
      default:
        return state;
  }
}