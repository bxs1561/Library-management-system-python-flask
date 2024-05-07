import {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAILURE,
        ADDUSER_REQUEST,ADDUSER_SUCCESS,ADDUSER_FAILURE,
        GET_USER_REQUEST,GET_USER_SUCCESS,GET_USER_FAILURE,USER_SIGNOUT,UPDATE_FILTERED_USER,
        DELETE_USER_REQUEST,DELETE_USER_SUCCESS,DELETE_USER_FAILURE,
        EDIT_USER_REQUEST,EDIT_USER_SUCCESS,EDIT_USER_FAILURE} from '../ActionTypes/UserActionTypes'

import axios from '../../API/axios'

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
      dispatch(addUserFailure(error));
  }
};


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
              // if (userRole === 'admin') {
              //   navigate('/dashboard');
              // }
  
            }
            else{
              dispatch(loginFailure(responseData))
              // console.log(parsedResponse)
            }
          
        }catch(error){
          console.log(error.message)
        }
        
      }
export const fetchUser=() => async(dispatch)=>{
        dispatch(getUserRequest());
        try {
            const response = await axios.get('/users');
            const responseData =  response.data
            const filteredUsers = responseData?.filter(usr => usr.role.name === 'student' || usr.role.name === 'librarian');

            dispatch(getUserSuccess(filteredUsers));
        } catch (error) {
            // dispatch(addUserFailure(error));
            dispatch(getUserFailure(error))
        }
    };
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
  } catch (error) {
    dispatch(deleteUserFailure(error));
  }
};

export const editUser=(user_id,user)=>async(dispatch)=>{
  dispatch(editUserRequest())
  try{
      const response = await axios.put(`/user/${user_id}`, user)
      const updatedResponse = response.data
      dispatch(editUserSuccess(updatedResponse))
  }catch(error){
      dispatch(editUserFailure(error))
  }
}
export const signout = ()=> (dispatch)=>{
      localStorage.removeItem("user");
      dispatch({
          type: USER_SIGNOUT
      })
  };


export const addAdmin=(userData)=>async(dispatch)=>{
    dispatch(addUserRequest())
    try {
        const response = await axios.post('/admin/add', userData,{
            headers: {
                "content-type": "application/json"
            }
        });
        const responseData = response.data;
        const parsedResponse = JSON.parse(responseData);
        // dispatch(addUserSuccess(responseData));
        if (parsedResponse.success==true) {
            dispatch(addUserSuccess(responseData));
          } else {
            dispatch(addUserFailure(responseData));
          }

    } catch (error) {
        dispatch(addUserFailure(error));
    }
};