import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate, Link
  } from "react-router-dom";
  
import Dashboard from './Dashboard';
import Login from '../login/Login';
import Registration from '../Registration/Registration'
import AddUser from '../User/Managed User/AddUser'
import ViewUser from "../User/Managed User/ViewUser";
import LibraryCard from "../User/Managed User/LibraryCard";
import AddBook from "../Book/AddBook/AddBook"
import { useSelector, useDispatch } from 'react-redux'


function AdminDashboard(){
 

    return(
      
<>

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-user" element={<AddUser />} />
      <Route path="/view-user" element={<ViewUser />} />
      <Route path="/library-card/:user_id" element={<LibraryCard />} />
      <Route path="/add-book" element={<AddBook />} />
    </>
    )
}
export default AdminDashboard