import logo from './logo.svg';
import Login from "./login/Login";
import ViewBook from './Book/ViewBook/ViewBook';
import AddBook from './Book/AddBook/AddBook';
import BookReservation from './Book/BookReservation/BookReservation';
import ViewReservedBook from './Book/ViewReservedBook/ViewReservedBook';
import AddUser from './User/Managed User/AddUser';
import ViewUser from './User/Managed User/ViewUser';
import LibraryCard from './User/Managed User/LibraryCard';
import Dashboard from './dashboard/Dashboard';
import VisitorStats from './Visitor/VisitorStats'
import PopularBooks from './Book/PopularBook/PopularBook'
import Registration from './Registration/Registration'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate, Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login/>}/> 
          <Route path="/register" element={<Registration/>} /> 
          <Route path="/dashboard" element={<Dashboard/>} /> 

          

        </Routes>
      </Router>

        {/* <ViewBook/> */}
        {/* <AddBook/> */}
        {/* <BookReservation/> */}
        {/* <ViewReservedBook/> */}
        {/* <AddUser/> */}
        {/* <ViewUser/> */}
        {/* <LibraryCard/> */}
        {/* <Dashboard/> */}
        {/* <VisitorStats/> */}
        {/* <PopularBooks/> */}
        {/* <Registration/> */}
    </div>
  );
}

export default App;
