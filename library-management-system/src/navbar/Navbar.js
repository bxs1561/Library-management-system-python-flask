import React, { useState } from 'react';
import './Navbar.css'
import {
    Link} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import SideBar from '../sidebar/SideBar'

function Navbar(){
    const [showSidebar, setShowSidebar] = useState(false);
    const[activeNav, setActiveNav] = useState("#home");
    const {user} = useSelector(state => state.getUser);
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
      };


    return(
        <header className="nav__header">
      <nav className="nav container">
        <div className="nav__toggle" onClick={toggleSidebar}>
        <i className={showSidebar ? "uil uil-times" : "uil uil-bars"}></i>
        </div>
        <a href="/" className="nav__logo">Bikram</a>
      </nav>
      <SideBar show={showSidebar} setShowSidebar={setShowSidebar} />    </header>
    )
}
export default Navbar


