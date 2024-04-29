import React,{useState,useEffect,useRef} from 'react';
import './SideBar.css';

const Sidebar = ({show,setShowSidebar}) => {
    const [clicked, setClicked] = useState(false); 
    const[Toggle,showMenu] = useState(false);
    const[activeNav, setActiveNav] = useState("#home");
    const sidebarRef = useRef(null);


    const handleClick = () => {
      setClicked(true); 
      setShowSidebar(false);
    };

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
    <div className={`sidebar___container ${show ? 'show' : ''}`} ref={sidebarRef}>
        <div className='sidebar'>
            <div className="user___panel">
                <div className="left___image">
                    <img src ='https://via.placeholder.com/400X400'/>
                </div>
                <div className="left___info">
                    <p>Bikram Subedi</p>
                    <span>Student</span>
                </div>
            </div>
            <ul className="sideBar___menu">
                <li className='nav___items'>
                    <a href='http://localhost:3000/dashboard' onClick={handleClick}>
                    <i class='bx bxs-dashboard'></i>
                    <p className={clicked ? 'clicked' : ''}>Dashboard</p>
                    </a>
                </li>
                <li className='nav___items'>
                    <a href='http://localhost:3000/dashboard' onClick={handleClick}>
                    <i class='bx bxs-dashboard'></i>
                    <p className={clicked ? 'clicked' : ''}>View book</p>
                    </a>
                </li>

            </ul>
        </div>
       
      
    </div>
  );
}

export default Sidebar;

