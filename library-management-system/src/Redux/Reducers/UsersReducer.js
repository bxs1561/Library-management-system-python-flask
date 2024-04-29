import { combineReducers } from 'redux';
import * as actions from '../ActionTypes/UserActionTypes'

const initialState = {
    user: null,
    isLoading: false, 
    error: null,   
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
  

// const UsersReducer = combineReducers({
//     addUser: addUserReducer,
//     login: loginReducer,
//     getUser:getUserReducer,
//     deleteUser: deleteUserReducer,
//     editUser: editUserReducer,
// });
// export default UsersReducer