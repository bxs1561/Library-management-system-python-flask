import React,{useState,useEffect,useRef} from 'react';
import './SideBar.css';
import {Link} from "react-router-dom";

/**
 * Display side bar base on user_role.
 */
const Sidebar = ({show,setShowSidebar}) => {
  const sidebarRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const [clicked, setClicked] = useState(false); 
  const [isOpenManageBook, setIsOpenManageBook] = useState(false);
  const [isOpenCheckoutBook, setIsOpenCheckoutBook] = useState(false);
  const [isOpenManageUser, setIsOpenManageUser] = useState(false);

  
  const handleClick = (e) => {
    e.preventDefault()
    setClicked(true); 
    setShowSidebar(false);
  };

  const toggleManageBook = () => {
    setIsOpenManageBook(!isOpenManageBook);
    setIsOpenCheckoutBook(false); // Close checkout book menu
    setIsOpenManageUser(false)
  };
  const toggleCheckoutBook = () => {
    setIsOpenCheckoutBook(!isOpenCheckoutBook);
    setIsOpenManageBook(false); // Close manage book menu
    setIsOpenManageUser(false)
  };

  const toggleManageUser =()=>{
    setIsOpenCheckoutBook(false);
    setIsOpenManageBook(false);
    setIsOpenManageUser(!isOpenManageUser)
  }

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setShowSidebar(false); 
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [setShowSidebar]);
    
  return (
    <>
    {user && user.user_role==="admin" &&(
    <div className={`sidebar___container ${show ? 'show' : ''}`} ref={sidebarRef}>
        <div className='sidebar'>
            <div className="user___panel">
                <div className="left___image">
                    <img src ='https://via.placeholder.com/400X400'/>
                </div>
                <div className="left___info">
                    <p>{user?.username}</p>
                    <span>{user?.user_role}</span>
                </div>
            </div>
            <ul className="sideBar___menu">
                <li className='nav___items'>
                    <a href='http://localhost:3000/dashboard'>
                    <i className='bx bxs-dashboard'></i>
                    <p>Dashboard</p>
                    </a>
                </li>
                <li className='nav___items'>
                    <i className='bx bxs-dashboard'></i>
                    <p onClick={toggleManageBook}>Manage Book</p>
                    {/* </a> */}
                </li>
                {isOpenManageBook&&(
                  <ul className='items'>
                    <li className='inside___items'>
                   <Link to="/view-book">
                    <p>View Book</p>
                   </Link>
                   </li>
                   <li className='inside___items' style={{marginTop:'-15px'}}>
                   <Link to="/add-book">
                    <p>Add Book</p>
                   </Link>
                   </li>
                   </ul>
                )}
                 <li className='nav___items'>
                    <i className='bx bxs-dashboard'></i>
                    <p onClick={toggleCheckoutBook}>checkout Book</p>
                    {/* </a> */}
                </li>
                {isOpenCheckoutBook&&(
                  <ul className='items'>
                    <li className='inside___items'>
                   <Link to="/book-checkout">
                    <p>Checkout Book</p>
                   </Link>
                   </li>
                   <li className='inside___items' style={{marginTop:'-15px'}}>
                   <Link to="/checkout">
                    <p>View Checkout</p>
                   </Link>
                   </li>
                   </ul>
                )}
                 <li className='nav___items'>
                    <i className='bx bxs-dashboard'></i>
                    <p onClick={toggleManageUser}>Manage User</p>
                    {/* </a> */}
                </li>
                  {isOpenManageUser&&(
                  <ul className='items'>
                    <li className='inside___items'>
                   <Link to="/add-user">
                    <p>Add User</p>
                   </Link>
                   </li>
                   <li className='inside___items' style={{marginTop:'-15px'}}>
                   <Link to="/view-user">
                    <p>View User</p>
                   </Link>
                   </li>
                   </ul>
                )}
                <li className='nav___items'>
                    <i className='bx bxs-dashboard'></i>
                    <p >Manage Fine</p>
                    {/* </a> */}
                </li>
               
               

            </ul>
        </div>
       
      
    </div>)}
    {user && user.user_role === 'student' && (
          <div className={`sidebar___container ${show ? 'show' : ''}`} ref={sidebarRef}>
          <div className='sidebar'>
              <div className="user___panel">
                  <div className="left___image">
                      <img src ='https://via.placeholder.com/400X400'/>
                  </div>
                  <div className="left___info">
                      <p>{user?.username}</p>
                      <span>{user?.user_role}</span>
                  </div>
              </div>
              <ul className="sideBar___menu">
                  <li className='nav___items'>
                      <a href='http://localhost:3000/dashboard' onClick={handleClick}>
                      <i className='bx bxs-dashboard'></i>
                      <p>Dashboard</p>
                      </a>
                  </li>
                  
                 
                 
                  <li className='nav___items'>
                      <Link to="/view-book">
                      <i className='bx bxs-dashboard'></i>
                      <p>View Book</p>
                      </Link>
                  </li>
                  <li className='nav___items'>
                      <Link to="/checkout/:student_id">
                      <i className='bx bxs-dashboard'></i>
                      <p>view-checkout-book</p>
                      </Link>
                  </li>
                 
                 
  
              </ul>
          </div>
         
        
      </div>)}

    
    </>
  );
}

export default Sidebar;

