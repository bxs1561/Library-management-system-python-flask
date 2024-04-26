import axios from '../API/axios'

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const ADDUSER_REQUEST = 'ADDUSER_REQUEST';
export const ADDUSER_SUCCESS = 'ADDUSER_SUCCESS';
export const ADDUSER_FAILURE = 'ADDUSER_FAILURE';

export const REMOVE_USER_BY_ADMIN = 'REMOVE_USER_BY_ADMIN';


export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';
export const UPDATE_SEARCH_TERM = 'UPDATE_SEARCH_TERM';

export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

export const EDIT_USER_REQUEST = 'EDIT_USER_REQUEST';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAILURE = 'EDIT_USER_FAILURE';

export const ADD_BOOK_REQUEST = 'ADD_BOOK_REQUEST';
export const ADD_BOOK_SUCCESS = 'ADD_BOOK_SUCCESS';
export const ADD_BOOK_FAILURE = 'ADD_BOOK_FAILURE';




export const GET_CHECKOUT_REQUEST = 'GET_CHECKOUT_REQUEST';
export const GET_CHECKOUT_SUCCESS = 'GET_CHECKOUT_SUCCESS';
export const GET_CHECKOUT_FAILURE = 'GET_CHECKOUT_FAILURE';

export const GET_BOOK_REQUEST = 'GET_BOOK_REQUEST';
export const GET_BOOK_SUCCESS = 'GET_BOOK_SUCCESS';
export const GET_BOOK_FAILURE = 'GET_BOOK_FAILURE';

export const ADD_BOOK_CHECKOUT_REQUEST = 'ADD_BOOK_CHECKOUT_REQUEST';
export const ADD_BOOK_CHECKOUT_SUCCESS = 'ADD_BOOK_CHECKOUT_SUCCESS';
export const ADD_BOOK_CHECKOUT_FAILURE = 'ADD_BOOK_CHECKOUT_FAILURE';








export const addUserRequest = (credentials) => ({
  type: ADDUSER_REQUEST,
  payload: credentials,
});

export const addUserSuccess = (user) => ({
  type: ADDUSER_SUCCESS,
  payload: user,
});

export const addUserFailure = (error) => ({
  type: ADDUSER_FAILURE,
  payload: error,
});

export const loginRequest = (credentials) => ({
    type: LOGIN_REQUEST,
    payload: credentials,
  });
  
  export const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: user,
  });
  
  export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error,
  });

  //delte user
  export const delteUserRequest = () => ({
    type: DELETE_USER_REQUEST,
  });
  
  export const deleteUserSuccess = (user_id) => ({
    type: DELETE_USER_SUCCESS,
    payload: user_id,
  });
  
  export const deleteUserFailure = (error) => ({
    type: DELETE_USER_FAILURE,
    payload: error,
  });

  //edit user
  export const editUserRequest = () => ({
    type: EDIT_USER_REQUEST,
  });
  
  export const editUserSuccess = (user) => ({
    type: EDIT_USER_SUCCESS,
    payload: user,
  });
  
  export const editUserFailure = (error) => ({
    type: EDIT_USER_FAILURE,
    payload: error,
  });





  // export const getUserRequest=()


  //get user from api to display in page
 
export const getUserRequest = () => ({
    type: 'GET_USER_REQUEST',
  });
  
export const getUserSuccess = (data) => ({
    type: 'GET_USER_SUCCESS',
    payload: data,
  });
  
export const getUserFailure = (error) => ({
    type: 'GET_USER_FAILURE',
    payload: error,
  });

export const updateFilteredUser = (data) => ({
    type: 'UPDATE_FILTERED_USER',
    payload: data,
  });

export const updateSearchTerm = (searchTerm) => ({
  type: UPDATE_SEARCH_TERM,
  payload: searchTerm,
});

  

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

//get checkout book
export const getChceckoutBookRequest = () => ({
  type: GET_CHECKOUT_REQUEST,
});

export const getChceckoutBookSuccess = (book) => ({
  type: GET_CHECKOUT_SUCCESS,
  payload: book,
});

export const getChceckoutBookFailure = (error) => ({
  type: GET_CHECKOUT_FAILURE,
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

//get  book
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