import {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAILURE,
  ADDUSER_REQUEST,ADDUSER_SUCCESS,ADDUSER_FAILURE,
  GET_USER_REQUEST,GET_USER_SUCCESS,GET_USER_FAILURE,USER_SIGNOUT,UPDATE_FILTERED_USER,
  DELETE_USER_REQUEST,DELETE_USER_SUCCESS,DELETE_USER_FAILURE,
  EDIT_USER_REQUEST,EDIT_USER_SUCCESS,EDIT_USER_FAILURE,
  GET_LOG_EVENTS_REQUEST,GET_LOG_EVENTS_SUCCESS,GET_LOG_EVENTS_FAILURE,
  GET_USER_CHECKOUT_REQUEST,GET_USER_CHECKOUT_SUCCESS,GET_USER_CHECKOUT_FAILURE,SAVE_USER_PAYMENT_ACTION,
  GET_STUDENT_REQUEST,GET_STUDENT_SUCCESS,GET_STUDENT_FAILURE} from '../actionTypes/userActionTypes'
import axios from '../../API/axios'

//add user
export const addUserRequest = () => ({
  type: ADDUSER_REQUEST,
});
  
export const addUserSuccess = (user) => ({
  type: ADDUSER_SUCCESS,
  payload: user,
});
  
export const addUserFailure = (error) => ({
  type: ADDUSER_FAILURE,
  payload: error,
});

//user login
export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});
    
export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

//Get users
export const getUserRequest=()=>({
  type: GET_USER_REQUEST,
})
export const getUserSuccess=(user)=>({
  type: GET_USER_SUCCESS,
  payload:user
})
    
export const getUserFailure=(error)=>({
  type: GET_USER_FAILURE,
  payload:error
})

export const updateFilteredUser = (data) => ({
  type: UPDATE_FILTERED_USER,
  payload: data,
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

//Get Log Event
export const getLogEventRequest = () => ({
  type: GET_LOG_EVENTS_REQUEST,
});

export const getLogEventSuccess = (log) => ({
  type: GET_LOG_EVENTS_SUCCESS,
  payload: log,
});

export const getLogEventFailure = (error) => ({
  type: GET_LOG_EVENTS_FAILURE,
  payload: error,
});

//get user checkout
export const getUserCheckoutRequest = () => ({
  type: GET_USER_CHECKOUT_REQUEST,
});

export const getUserCheckoutSuccess = (checkoutUserBook) => ({
  type: GET_USER_CHECKOUT_SUCCESS,
  payload: checkoutUserBook,
});

export const getUserCheckoutFailure = (error) => ({
  type: GET_USER_CHECKOUT_FAILURE,
  payload: error,
});

//Save payment method
export const savePaymentMethod=(paymentMethod)=>({
  type: SAVE_USER_PAYMENT_ACTION,
  payload:paymentMethod
})

//get user Student
export const getStudentRequest = () => ({
  type: GET_STUDENT_REQUEST,
});

export const getStudentSuccess = (user) => ({
  type: GET_STUDENT_SUCCESS,
  payload: user,
});

export const getStudentFailure = (error) => ({
  type: GET_STUDENT_FAILURE,
  payload: error,
});


/**
 * Add user api post request.
 */
export const addUser=(userData)=>async(dispatch)=>{
  dispatch(addUserRequest(userData));
  try {
    const response = await axios.post('/user/add', userData,{
      headers: {
        "content-type": "application/json",
      }
    });
    const responseData = response.data
    if(responseData.success==true){
      dispatch(addUserSuccess(responseData));
    }
    else{
      dispatch(addUserFailure(responseData))
    }
  } catch (error) {
     console.log(error.message);
  }
};


/**
 * User login post request.
 */
export const login=(userData)=>async(dispatch)=>{
  dispatch(loginRequest())
  try{
    const result = await axios.post('/user/login',userData,{
      headers: {
        "content-type": "application/json"
      }
      })
      const responseData = result.data;
      // const parsedResponse = JSON.parse(responseData);
      if(responseData.success==true){
        localStorage.setItem('sessionKey', responseData.session_key);
        localStorage.setItem("user", JSON.stringify(responseData.user))
        dispatch(loginSuccess(responseData.user))  
        const userRole = responseData.user.user_role;
      }
      else{
        dispatch(loginFailure(responseData))
        // console.log(parsedResponse)
      }
    }
  catch(error){
    console.log(error.message)
  }
}

/**
 * Get users request.
 */
export const fetchUser=() => async(dispatch)=>{
  dispatch(getUserRequest());
  try {
    const response = await axios.get('/users');
    const responseData =  response.data
    const filteredUsers = responseData?.filter(usr => usr.role.name === 'student' || usr.role.name === 'librarian');
    dispatch(getUserSuccess(filteredUsers));
  } 
  catch(error){
    dispatch(getUserFailure(error))
  }
};

/**
 * Delete user request.
 */
export const deleteUser = (userID) =>async(dispatch)=>{
  const session_key = localStorage.getItem("sessionKey")
    ? localStorage.getItem("sessionKey"):
    null
  dispatch(delteUserRequest()); 
  try {
    await axios.delete(`/user/${userID}`,{
      headers: {
        "content-type": "application/json",
        "session": `${session_key}`
     }
    });
    dispatch(deleteUserSuccess(userID)); 
  } 
  catch (error) {
    dispatch(deleteUserFailure(error));
  }
};

/**
 * Edit user request api.
 */
export const editUser=(user_id,user)=>async(dispatch)=>{
  dispatch(editUserRequest())
  try{
    const response = await axios.put(`/user/${user_id}`, user)
    const updatedResponse = response.data
    dispatch(editUserSuccess(updatedResponse))
  }catch(error){
    console.log(error.message)
  }
}

/**
 * Sign out user by deleting user info from local storage.
 */
export const signout = ()=> (dispatch)=>{
  localStorage.removeItem("user");
  dispatch({
    type: USER_SIGNOUT
  })
};

/**
 * Post request only for admin.
 */
export const addAdmin=(userData)=>async(dispatch)=>{
  dispatch(addUserRequest())
  try {
    const response = await axios.post('/admin/add', userData,{
      headers: {
        "content-type": "application/json"
      }
    });
    const responseData = response.data;
    // dispatch(addUserSuccess(responseData));
    if (responseData.success==true) {
      dispatch(addUserSuccess(responseData));
    } 
    else{
      dispatch(addUserFailure(responseData));
    }
  }
  catch (error) {
    console.log(error.message);
  }
};

/**
 * Get Weekly Log event request.
 */
export const fetchLogEvent=() => async(dispatch)=>{
  dispatch(getLogEventRequest());
  try {
    const response = await axios.get('/weekly-report');
    const responseData =  response.data
    dispatch(getLogEventSuccess(responseData));
  } 
  catch (error) {
    dispatch(getLogEventFailure(error))
  }
};

/**
 * Fetch checkout book filter by student_id.
 */
export const fetchUserCheckout=(student_id) => async(dispatch)=>{
  dispatch(getUserCheckoutRequest());
  try {
    const response = await axios.get(`/checkout/${student_id}`);
    const responseData =  response.data
    dispatch(getUserCheckoutSuccess(responseData));
  } 
  catch (error) {
    dispatch(getUserCheckoutFailure(error))
  }
};


/**
 * Get All student users.
 */
export const fetchUserStudent=() => async(dispatch)=>{
  dispatch(getStudentRequest());
  try {
    const response = await axios.get('/users/students');
    const responseData =  response.data
    dispatch(getStudentSuccess(responseData));
  } 
  catch (error) {
    dispatch(getStudentFailure(error))
  }
};