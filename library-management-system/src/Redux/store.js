import { configureStore } from '@reduxjs/toolkit'
import {thunk} from 'redux-thunk';
import {addUserReducer,loginReducer,getUserReducer,deleteUserReducer,editUserReducer} from './Reducers/UsersReducer';
import {addBookReducer,getBookReducer,deleteBookReducer,getCheckoutBookReducer,addCheckoutBookReducer,getPopularBookReducer} from './Reducers/BooksReducer'
import { combineReducers,applyMiddleware, compose } from 'redux';


const reducer = combineReducers({
    addUser: addUserReducer,
    login: loginReducer,
    getUser:getUserReducer,
    deleteUser: deleteUserReducer,
    editUser: editUserReducer,
    addBook: addBookReducer,
    getBook: getBookReducer,
    deleteBook: deleteBookReducer,
    checkoutBooks: getCheckoutBookReducer,
    addCheckoutBook: addCheckoutBookReducer,
    getPopularBook: getPopularBookReducer,
});


  
  // Create the Redux store with the combined root reducer
  // const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const store = configureStore({
    reducer:reducer}
    // composeEnhancer(applyMiddleware(thunk))
  );
export default store;
