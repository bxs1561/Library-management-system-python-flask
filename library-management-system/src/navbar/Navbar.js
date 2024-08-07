import React, { useState } from 'react';
import './Navbar.css'
import {Link,useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import SideBar from '../sidebar/SideBar'
import { signout } from '../redux/action/usersAction';

/**
 * Navbar Component and sidebar added to left.
 */
function Navbar(){
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [showSidebar, setShowSidebar] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const [isOpen, setIsOpen] = useState(false);
    
  /**
   * Sign out from the page and go back to home page.
   */
  const signOut=()=>{
    dispatch(signout())
    navigate("/")
  }


  const toggleBox = () => {
    setIsOpen(!isOpen);
  };

  /**
   * toggle sidebar.
   */
  const toggleSidebar = () => {
      setShowSidebar(!showSidebar);
    };

  return(
    <header className="nav__header">
      <nav className="nav nav___container">
        <div className="nav__toggle" onClick={toggleSidebar}>
          <i className={showSidebar ? "uil uil-times" : "uil uil-bars"}></i>
        </div>
        <span onClick={toggleBox} className="nav__logo">{user?.username}</span>
      </nav>
      {isOpen && (
        <ul className="dropdown-menu">
          <li className='user-header'>
            <i style={{marginLeft:"-40px"}}className='bx bxs-id-card'></i>
            <p>Profile</p>
          </li>
          <Link to="/" onClick={signOut}>
            <li className='user-header'>
              <i style={{marginLeft:"-40px"}}className='bx bx-log-out'></i>
              <p>Sign Out</p>
            </li>
          </Link>
        </ul>
      )}
      <SideBar show={showSidebar} setShowSidebar={setShowSidebar} />    
    </header>
  )
}
export default Navbar


