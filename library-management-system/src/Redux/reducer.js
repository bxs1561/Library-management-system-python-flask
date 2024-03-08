import { combineReducers } from 'redux';
import * as actions from './action'

const initialState = {
    user: null,
    isLoading: false, 
    error: null,   
  };

const addUserReducer = (state = initialState, action) => {
    switch(action.type){
      case 'ADDUSER_REQUEST':
        return{
          ...state, isLoading: true
        }
      case 'ADDUSER_SUCCESS':
        return{
          ...state, isLoading: false, user:action.payload
        }
      case 'ADDUSER_FAILURE':
        return{
          ...state, isLoading: false, error:action.payload
        }
      default:
        return state;

    }
}

const loginReducer = (state = initialState, action) => {
  switch(action.type){
    case 'LOGIN_REQUEST':
      return{
        ...state, isLoading: true
      }
    case 'LOGIN_SUCCESS':
      return{
        ...state, isLoading: false, user:action.payload
      }
    case 'LOGIN_FAILURE':
      return{
        ...state, isLoading: false, error:action.payload
      }
    default:
      return state;

  }
}

const deleteUser = (state=initialState,action)=>{
  switch(action.type){
    case 'REMOVE_USER_BY_ADMIN':
      return{
        ...state,
        users: state.users.filter(user => user.id !== action.payload)
      }
      default:
        return state;
  }
}

const getUserReducer=(state=initialState,action)=>{
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

// const userReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case actionTypes.SET_USER:
//         return{
//           ...state,
//           user: action.user
//         }
//             default:
//         return state;
//     }
//   };
const reducer = combineReducers({
    user: addUserReducer,
    login: loginReducer,
    deleteUser: deleteUser,
    getUser:getUserReducer,
});
  

export default reducer;
