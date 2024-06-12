import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserCheckout } from "../../redux/action/usersAction";
import { useLocation } from "react-router-dom";
import PaymentModal from '../../modal/PaymentModal'

/**
 * View a user checkout book in table.
 */
function ViewSingleCheckoutBook(){
    const dispatch = useDispatch();

    const  {checkoutUserBook}  = useSelector((state) => state.getUserCheckout);
    const user = JSON.parse(localStorage.getItem("user"));


    const [selectedFine, setSelectedFine] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const[checkoutDate, setCheckoutDate] = useState(new Date())
    const [checkoutBooks, setCheckoutBooks] = useState([]);

    useEffect(()=>{
        setCheckoutBooks(checkoutUserBook)
    },[checkoutUserBook])

    // useEffect(()=>{
    //         dispatch(fetchUserCheckout(1));
        
        
    // },[dispatch])
    useEffect(() => {
        if (user && user.user_id) {
            dispatch(fetchUserCheckout(user.user_id));
        }
    }, [dispatch]);

    /**
     * display modal with fine and date.
     */
    const handleToggleModal = (fine) => {
        setSelectedFine(fine)
        setIsModalOpen(!isModalOpen);
    };

    return(
        <div className="reserved___container">
            <div className="heading___title">
                <h1>Reserved Book List</h1>
            </div>
            <div className="card">
                <div className="card___body">
                    <div className="reserved___row" style={{overflowX:"auto",overflow:"auto"}}>
                        <div className="reservedbook___info">
                            {checkoutBooks?.length>0&&(
                                <table className="reservedbook___table">
                                    <thead>
                                        <tr>
                                            <th>Book ID</th>
                                            <th>User ID</th>
                                            <th>Book Name</th>
                                            <th>User Name</th>
                                            <th>Issue date</th>
                                            <th>Due Date</th>
                                            <th>Borrow Days</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {checkoutBooks?.map(checkout=>(
                                            <tr key={checkout.checkout_id}>
                                                <td>{checkout.books.book_id}</td>
                                                <td>{checkout.student.user.user_id}</td>
                                                <td>{checkout.books.title}</td>
                                                <td> {checkout.student.user.first_name}<br></br>{checkout.student.user.last_name}</td>
                                                <td>{checkout.checkout_date}</td>
                                                <td>{checkout.due_date}</td>
                                                <td>{checkout.borrow_days}</td>
                                                <td>
                                                    <button onClick={() => handleToggleModal(checkout.student.fine_balance)} className="fine___button">
                                                        pay fine
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                            {checkoutBooks?.length === 0 && (
                                <p>No book checkout.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && <PaymentModal fine={selectedFine} onClose={handleToggleModal} setFine={setSelectedFine} checkoutDate={checkoutDate} setCheckoutDate={setCheckoutDate} amount={selectedFine}/>}
        </div>
    )
}
export default ViewSingleCheckoutBook;