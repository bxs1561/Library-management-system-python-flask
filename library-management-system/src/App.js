import logo from './logo.svg';
import './App.css';
import Login from "./login/Login";
import ViewBook from './Book/ViewBook/ViewBook';
import AddBook from './Book/AddBook/AddBook';
import BookReservation from './Book/BookReservation/BookReservation';
import ViewReservedBook from './Book/ViewReservedBook/ViewReservedBook';

function App() {
  return (
    <div className="App">
        {/* <Login/> */}
        {/* <ViewBook/> */}
        {/* <AddBook/> */}
        {/* <BookReservation/> */}
        <ViewReservedBook/>
    </div>
  );
}

export default App;
