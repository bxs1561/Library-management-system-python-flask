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
import { loginRequest, loginSuccess } from "../Redux/action";


function Login() {
    // const history = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const dispatch = useDispatch();


    const handleLogin=async(event)=>{
      event.preventDefault();
      let userData = {
        username:username,
        password:password,
        role_name:role
      }
      dispatch(loginRequest(userData))
      try{
        axios.post('/user/login',userData,{
          headers: {
            "content-type": "application/json"
        }
        }).then(result=>{
          localStorage.setItem('sessionKey', result.data.session_key);
          localStorage.setItem("user", JSON.stringify(result.data.user))
          dispatch(loginSuccess(result.data.user))
        })
      }catch(error){
        console.log(error.message)
      }


    }


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
                  type="text"
                  placeholder="Email address"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
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
              <div className="form-group">
            <h5>Select Role</h5>
            <select
              value={role}
              onChange={(event) => setRole(event.target.value)}
            >
              <option value="">Select...</option>
              <option value="admin">Admin</option>
              <option value="librarian">Librarian</option>
              <option value="student">Student</option>
            </select>
          </div>
              <button type="submit" onClick={handleLogin} className="login_signInButton">
                Sign In
              </button>
            </form>
            <div className="login_registerButton">
              <p>Don't have an account?</p>
              {/* <p>Don't have an account? <Link to="/register">Register</Link></p> */}

            </div>
          </div>
        </div>
      );
    

}
export default Login
