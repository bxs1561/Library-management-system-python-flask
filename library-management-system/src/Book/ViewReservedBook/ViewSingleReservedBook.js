import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserCheckout } from "../../Redux/Action/UsersAction";
import { useLocation } from "react-router-dom";


function ViewSingleReservedBook(){
    const dispatch = useDispatch();

    const  {checkoutUserBook}  = useSelector((state) => state.getUserCheckout);
    const user = JSON.parse(localStorage.getItem("user"));

    const [checkoutBooks, setCheckoutBooks] = useState([]);


    useEffect(()=>{
        setCheckoutBooks(checkoutUserBook)
    },[checkoutUserBook])

    useEffect(()=>{
        dispatch(fetchUserCheckout(1))
    },[dispatch])

    // const handleToggleModal = (fine) => {
    //     setSelectedFine(fine)
    //   setIsModalOpen(!isModalOpen);

    // };
    console.log(checkoutUserBook)

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
                        <td>
                            {/* {console.log(checkout)} */}
                            {checkout.student.user.user_id}
                            {/* <img
                            src={checkout.student.user.user_image_url?checkout.student.user.user_image_url:avatar}
                            alt="user Cover"
                            className="user-cover"
                            /> */}
                        </td>
                        <td>
                            {checkout.books.title}
                        </td>
                        <td> {checkout.student.user.first_name}<br></br>{checkout.student.user.last_name}</td>
                        <td>{checkout.checkout_date}</td>
                        <td>
                        {checkout.due_date}
                           
                        </td>
                        <td>
                        {checkout.borrow_days}
                        </td>
                        <td>
                        
                            <button  className="fine___button">
                            <i style={{width:"30px",fontSize:"20px"}}className='bx bx-wallet'></i>
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
        {/* {isModalOpen && <Modal fine={selectedFine} onClose={handleToggleModal} setFine={setSelectedFine} checkoutDate={checkoutDate} setCheckoutDate={setCheckoutDate}/>} */}

    </div>
)
}


    

export default ViewSingleReservedBook;