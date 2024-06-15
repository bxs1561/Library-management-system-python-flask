import { configureStore } from '@reduxjs/toolkit'
import {thunk} from 'redux-thunk';
import {addUserReducer,getStudentReducer,loginReducer,getUserReducer,deleteUserReducer,editUserReducer,getLogEventReducer,getUserCheckoutReducer,getPaymentReducer} from './reducers/usersReducer';
import {addBookReducer,getBookReducer,deleteBookReducer,getCheckoutBookReducer,addCheckoutBookReducer,getPopularBookReducer,getBookRecommendationReducer,
  editBookReducer
} from './reducers/booksReducer'
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
    getLogEvent: getLogEventReducer,
    getBookRecommendation: getBookRecommendationReducer,
    editBook:editBookReducer,
    getUserCheckout:getUserCheckoutReducer,
    getStudent:getStudentReducer,
    getPayment:getPaymentReducer,
});


const store = configureStore({
  reducer:reducer}
  // composeEnhancer(applyMiddleware(thunk))
);
export default store;
