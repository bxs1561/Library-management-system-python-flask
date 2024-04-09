import React, {useEffect, useState} from "react";
import "./Login.css"
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate, Link
} from "react-router-dom";
import axios from "../API/axios";
import { useSelector, useDispatch } from 'react-redux'
import { loginFailure, loginRequest, loginSuccess } from "../Redux/action";


function Login() {
    // const history = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
 

    const handleLogin=async(event)=>{
      event.preventDefault();
      let userData = {
        email:email,
        password:password,
      }
      dispatch(loginRequest(userData))
      try{
        axios.post('/user/login',userData,{
          headers: {
            "content-type": "application/json"
        }
        }).then(result=>{
          const responseData = result.data;
          // const parsedResponse = JSON.parse(responseData);
          if(responseData.success==true){
            localStorage.setItem('sessionKey', responseData.session_key);
            localStorage.setItem("user", JSON.stringify(responseData.user))
            dispatch(loginSuccess(responseData.user))  
            const userRole = responseData.user.user_role;
            if (userRole === 'admin') {
              navigate('/dashboard');
            }

          }
          else{
            dispatch(loginFailure(responseData))
            // console.log(parsedResponse)
          }
        })
      }catch(error){
        console.log(error.message)
      }
      
    }
   
    // // Get session key from local storage
    // const sessionKey = localStorage.getItem('sessionKey');

    // // Include session key in your request headers or wherever it's needed
    // axios.defaults.headers.common['Authorization'] = `Bearer ${sessionKey}`;



    return (
        <div className="login">
          
          <div className="login_container">
          <div className="header">
        <h1>Library Management</h1>
      </div>
          
            {/* <h1>Sign in to your account</h1> */}
            <form>
              <div className="form-group">
                <h5>E-mail</h5>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="form-group">
                <h5>Password</h5>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <button type="submit" onClick={handleLogin} className="login_signInButton">
                Sign In
              </button>
            </form>
            <div className="login_registerButton">
            <Link to="/register">
              <p>Don't have an account?</p>
              </Link>
              {/* <p>Don't have an account? <Link to="/register">Register</Link></p> */}

            </div>
          </div>
        </div>
      );
    

}
export default Login
