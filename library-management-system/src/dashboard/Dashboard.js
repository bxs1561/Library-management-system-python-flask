import React, {useEffect, useState} from "react";
import './Dashboard.css'
import VisitorStats from '../Visitor/VisitorStats'
import PopularBooks from "../Book/popularBook/PopularBook";
import { useSelector, useDispatch } from 'react-redux'
import { fetchBook} from "../redux/action/booksAction";
import {fetchUserStudent,fetchUser} from "../redux/action/usersAction"
import {bookCheckout} from "../redux/action/booksAction"

/**
 * Dashboard display total books, total fine, total books borrow, total user, weekly visitor stat, and most popular book
 */
function Dashboard(){
    const dispatch = useDispatch();

    const  {books}  = useSelector((state) => state.getBook);
    const  {user}  = useSelector((state) => state.getStudent);
    const  users  = useSelector((state) => state.getUser);
    const  {checkoutBook}  = useSelector((state) => state.checkoutBooks);

    const [checkoutBooks, setCheckoutBooks] = useState([]);
    const [userData, setUserData] = useState([]);
    const [bookData, setBookData] = useState([]);
    const [studentData, setStudentData] = useState([]);

    const [sumCopies, setSumCopies] = useState(0);
    const [sumFines, setSumFines] = useState(0);

    useEffect(()=>{
        dispatch(fetchBook())
        dispatch(fetchUserStudent())
        dispatch(fetchUser())
        dispatch(bookCheckout())
    },[dispatch])

    useEffect(()=>{
        setBookData(books)
        setStudentData(user)
        setUserData(users?.user)
        setCheckoutBooks(checkoutBook)
    },[books,user,users,checkoutBook])
   
    /**
     * Add total copies of book
     */
    const sumTotalCopies=()=>{
        let sumCopies=0
        bookData?.forEach(book => {
            sumCopies += book.total_copies;
          });
        return sumCopies
    }
    /**
     * Get the total fines of student
     */
    const sumTotalFines=()=>{
        let sumFines=0;
        studentData?.forEach(student=>{
            sumFines+=student.fine_balance
        })
        return sumFines
    }
    
    useEffect(()=>{
        setSumCopies(sumTotalCopies())
        setSumFines(sumTotalFines)
    },[bookData,studentData])
    
    return(
        <div className="dashboard___container">
            <div className="dashboard___header">
                <h1>dashboard</h1>
            </div>
            <div className="content">
                <div className="dashboard___card">
                    <div className="dashboardcard___body">
                        <div className="dashboard___row"></div>
                            <div className="dashboard___row">
                                <div className="total___books">
                                    <div className="books___box">
                                        <i className='bx bxs-book'></i>
                                        <div className="books___content">
                                            <span className="book___boxtext">
                                                Total books
                                            </span>
                                            <span  className="info___book___number">{sumCopies}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="books___fine">
                                    <div className="fine___info">
                                        <i className='bx bx-money'></i>
                                        <div className="fine___content">
                                            <span className="fine___boxtext">
                                                Total fine
                                            </span>
                                            <span className="info___fine___number">{parseFloat(sumFines).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            <div className="books___borrow">
                                <div className="borrow___info">
                                    <i className='bx bx-cart'></i>
                                    <div className="borrow___content">
                                        <span className="borrow___boxtext">
                                            borrowed
                                        </span>
                                        <span className="info___borrow___number">{checkoutBooks?.length}</span>  
                                    </div>
                                </div>
                            </div>
                            <div className="total___users">
                                <div className="totalusers___info">
                                    <i className='bx bxs-user'></i>
                                    <div className="totalusers___content">
                                        <span className="totalusers___boxtext">
                                            users
                                        </span>
                                        <span className="info___users___number">{userData?.length}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dashboard___row">
                            <div className="graph">
                                <div className="visitor___stats" style={{height: '380px', width: '100%'}}>
                                    <VisitorStats/>
                                </div>
                            </div>
                            <div className="graph">
                                <div className="visitor___stats" style={{height: '380px', width: '100%'}}>
                                    <PopularBooks/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dashboard
