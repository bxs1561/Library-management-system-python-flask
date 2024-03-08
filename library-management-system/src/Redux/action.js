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

  //remove user
  export const removeUser=(userID)=>(dispatch)=>{
    axios.delete(`/user/${userID}`)
    dispatch({
      type: REMOVE_USER_BY_ADMIN,
      payload:userID,
    })
    
  };

  //get user from api to display in page
 
  // export const getUserRequest=()=>({
  //   type: GET_USER_REQUEST,
  // })
  // export const getUserSuccess=(user)=>({
  //   type: GET_USER_SUCCESS,
  //   payload:user
  // })

  // export const getUserFailure=(error)=>({
  //   type: GET_USER_FAILURE,
  //   payload:error
  // })


  export const getUser = ()=>
  async (dispatch)=>{
  dispatch({
      type: GET_USER_REQUEST
  })
      try {
          const {data} = await axios.get("/users")
          dispatch({
              type: GET_USER_SUCCESS, 
              payload: data
          })
      }catch (error) {
      dispatch({
          type: GET_USER_FAILURE,
          payload: error.message
      })
      }

}

// loginFailure, loginRequest,loginSuccess
