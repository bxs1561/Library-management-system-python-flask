import {ADD_BOOK_REQUEST,ADD_BOOK_SUCCESS,ADD_BOOK_FAILURE,
    GET_BOOK_REQUEST,GET_BOOK_SUCCESS,GET_BOOK_FAILURE,
    DELETE_BOOK_REQUEST,DELETE_BOOK_SUCCESS,DELETE_BOOK_FAILURE,
    GET_CHECKOUT_REQUEST,GET_CHECKOUT_SUCCESS,GET_CHECKOUT_FAILURE,
    ADD_BOOK_CHECKOUT_REQUEST,ADD_BOOK_CHECKOUT_SUCCESS,ADD_BOOK_CHECKOUT_FAILURE} from '../ActionTypes/BookActionTypes'

import axios from '../../API/axios'

//add book
export const addBookRequest = () => ({
    type: ADD_BOOK_REQUEST,
  });
  
export const addBookSuccess = (book) => ({
type: ADD_BOOK_SUCCESS,
payload: book,
});

export const addBookFailure = (error) => ({
type: ADD_BOOK_FAILURE,
payload: error,
});

//get  book
export const getBookRequest = () => ({
    type: GET_BOOK_REQUEST,
  });
  
export const getBookSuccess = (book) => ({
type: GET_BOOK_SUCCESS,
payload: book,
});

export const getBookFailure = (error) => ({
type: GET_BOOK_FAILURE,
payload: error,
});


//delete  book
export const deleteBookRequest = () => ({
  type: DELETE_BOOK_REQUEST,
});

export const deleteBookSuccess = (book_id) => ({
type: DELETE_BOOK_SUCCESS,
payload: book_id,
});

export const deleteBookFailure = (error) => ({
type: DELETE_BOOK_FAILURE,
payload: error,
});

//get checkout book
export const getChceckoutBookRequest = () => ({
  type: GET_CHECKOUT_REQUEST,
});

export const getChceckoutBookSuccess = (checkout_book) => ({
  type: GET_CHECKOUT_SUCCESS,
  payload: checkout_book,
});

export const getChceckoutBookFailure = (error) => ({
  type: GET_CHECKOUT_FAILURE,
  payload: error,
});

//add checkout  book
export const addBookCheckoutRequest = () => ({
  type: ADD_BOOK_CHECKOUT_REQUEST,
});

export const addBookCheckoutSuccess = (checkoutBook) => ({
  type: ADD_BOOK_CHECKOUT_SUCCESS,
  payload: checkoutBook,
});

export const addBookCheckoutFailure = (error) => ({
  type: ADD_BOOK_CHECKOUT_FAILURE,
  payload: error,
});



export const addBook=(bookData)=>async(dispatch)=>{
    dispatch(addBookRequest())
    try{
      const response = await axios.post('/book/add', bookData,{
        headers: {
            "content-type": "application/json",
        }
    });
    const responseData = response.data
    dispatch(addBookSuccess(responseData))

    }catch(error){
        dispatch(addBookFailure(error))
    }
  }

export const fetchBook=()=>async(dispatch)=>{
    dispatch(getBookRequest())
    try{
        const response = await axios.get('/books')
        const responseData = response.data
        dispatch(getBookSuccess(responseData));
    }catch(error){
        dispatch(getBookFailure(error))
    }
}

export const deleteBook=(book_id)=>async(dispatch)=>{
  dispatch(deleteBookRequest())
  try{
    await axios.delete(`/book/${book_id}`)
    dispatch(deleteBookSuccess(book_id))
  }catch(error){
    dispatch(deleteBookFailure())
  }
}

export const bookCheckout=()=>async(dispatch)=>{
  dispatch(getChceckoutBookRequest())
  try{
      const response = await axios.get('/books/checkout')
      const responseData = response.data
      dispatch(getChceckoutBookSuccess(responseData));

  }catch(error){
      dispatch(getChceckoutBookFailure(error))

  }
}

export const addCheckoutBook=(checkoutBookData)=>async(dispatch)=>{
  
  dispatch(addBookCheckoutRequest())
  try{
    const response = await axios.post('/checkout-book',checkoutBookData,{
      headers: {
        "content-type": "application/json",
    }

    })
    dispatch(addBookCheckoutSuccess(response.data))
  }
    catch(error){

    }

  }
