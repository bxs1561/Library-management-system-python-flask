import React, {useEffect, useState} from "react";
import "./Login.css"
import {BrowserRouter as Router,useNavigate, Link} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { login } from "../redux/action/usersAction";
import MessageBox from "../error/MessageBox";


/**
 * Login use base in role_type.
 */
function Login() {
  const navigate = useNavigate();
  const {error} = useSelector(state => state.login);
  const {user} = useSelector(state => state.login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  useEffect(()=>{
    if (user && user?.user_role === 'admin'){
      navigate('/dashboard')
    }
    if (user && user?.user_role === 'student'){
      navigate('/view-book')
    }
  },[navigate,user])


  /**
   * login using email and password.
   */
  const handleLogin=(event)=>{
    event.preventDefault();
    let userData = {
      email:email,
      password:password,
    }
    dispatch(login(userData))
  }

  return (
    <div className="login">
      <div className="login_container">
        <div className="header">
          <h1>Library Management</h1>
        </div>
        {error && <MessageBox variant="danger">{error?.error}</MessageBox>}
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
        </div>
      </div>
    </div>
  );
}
export default Login
