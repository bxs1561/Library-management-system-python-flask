import {ADD_BOOK_REQUEST,ADD_BOOK_SUCCESS,ADD_BOOK_FAILURE,
    GET_BOOK_REQUEST,GET_BOOK_SUCCESS,GET_BOOK_FAILURE,
    DELETE_BOOK_REQUEST,DELETE_BOOK_SUCCESS,DELETE_BOOK_FAILURE,
    GET_CHECKOUT_REQUEST,GET_CHECKOUT_SUCCESS,GET_CHECKOUT_FAILURE,
    ADD_BOOK_CHECKOUT_REQUEST,ADD_BOOK_CHECKOUT_SUCCESS,ADD_BOOK_CHECKOUT_FAILURE,
    GET_POPULAR_BOOK_REQUEST,GET_POPULAR_BOOK_SUCCESS,GET_POPULAR_BOOK_FAILURE,
    GET_BOOK_RECOMMENDATION_REQUEST,GET_BOOK_RECOMMENDATION_SUCCESS,GET_BOOK_RECOMMENDATION_FAILURE,
    EDIT_BOOK_REQUEST,EDIT_BOOK_SUCCESS,EDIT_BOOK_FAILURE} from '../ActionTypes/BookActionTypes'

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
//Edit Book
export const editBookRequest = () => ({
  type: EDIT_BOOK_REQUEST,
});

export const editBookSuccess = (book_id) => ({
type: EDIT_BOOK_SUCCESS,
payload: book_id,
});

export const editBookFailure = (error) => ({
type: EDIT_BOOK_FAILURE,
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

//get popular  book
export const getPopularBookRequest = () => ({
  type: GET_POPULAR_BOOK_REQUEST,
});

export const getPopularBookSuccess = (checkoutBook) => ({
  type: GET_POPULAR_BOOK_SUCCESS,
  payload: checkoutBook,
});

export const getPopularBookFailure = (error) => ({
  type: GET_POPULAR_BOOK_FAILURE,
  payload: error,
});

//get book Recommendation
export const getBookRecommendationRequest = () => ({
  type: GET_BOOK_RECOMMENDATION_REQUEST,
});

export const getBookRecommendationSuccess = (recommendation) => ({
type: GET_BOOK_RECOMMENDATION_SUCCESS,
payload: recommendation,
});

export const getBookRecommendationFailure = (error) => ({
type: GET_BOOK_RECOMMENDATION_FAILURE,
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
    if (responseData.success==true){
      dispatch(addBookSuccess(responseData))
      dispatch(addBookFailure(null))
    }
    else{
      dispatch(addBookFailure(responseData))
    }
    

    }catch(error){
      console.log(error.message)
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

export const editBook=(book_id,bookData)=>async(dispatch)=>{
  dispatch(editBookRequest())
  try{
    await axios.put(`/book/edit/${book_id}`,bookData)
    dispatch(editBookSuccess(book_id))
  }
  catch(error){
    console.log(error.message)
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

  export const popularBook=()=>async(dispatch)=>{
    dispatch(getPopularBookRequest())
    try{
      const response = await axios.get('/popular-book')
      const responseData = response.data
      dispatch(getPopularBookSuccess(responseData))
    }catch(error){
      dispatch(getPopularBookFailure(error))
    }

  }

  export const fetchBookRecommendation=(student_id)=>async(dispatch)=>{
    dispatch(getBookRecommendationRequest())
    try{
      const response = await axios.get(`recommendations?user_id=${student_id}`)
      const responseData = response.data
      dispatch(getBookRecommendationSuccess(responseData))
    }
    catch(error){
      console.log(error.message)
    }
  }
