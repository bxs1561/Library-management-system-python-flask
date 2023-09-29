import React, {useEffect, useState} from "react";
import "./Login.css"
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate, Link
} from "react-router-dom";


function Login() {
    // const history = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
              <button type="submit" className="login_signInButton">
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
