import React, {useEffect, useState} from "react";
import "./ViewUser.css"
import person1 from "../../images/person1.jpg"
import { useSelector, useDispatch } from 'react-redux'
import { getUserSuccess,getUserFailure, getUserRequest,updateFilteredUser,updateSearchTerm, delteUserRequest, deleteUserFailure, deleteUserSuccess, editUserRequest, editUserSuccess, editUserFailure } from "../../Redux/action";
import axios from '../../API/axios'
import {userDataArray} from '../../data/UserData'
import _ from 'lodash'
import LibraryCard from './LibraryCard'
import { useHistory } from "react-router-dom"; // Import useHistory
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate, Link,useParams
  } from "react-router-dom";

function ViewUser(){
    const [student, setStudent] = useState('');
    // const [userData, setUserData] = useState(userDataArray());
    const [selectedUser, setSelectedUser] = useState(null);
    const  {user}  = useSelector((state) => state.getUser);
    // const user = useSelector(state => state.getUser.user); 
    // const [searchTerm, setSearchTerm] = useState('');
    // const navigate = useNavigate();

    
    const session_key = localStorage.getItem("sessionKey")
    ? localStorage.getItem("sessionKey"):
    null








    const dispatch = useDispatch();
    // const users = useSelector(state => state.getUser);
   
   
    const getUser = async()=>{
        dispatch(getUserRequest());
        try {
            const response = await axios.get('/users');
            const responseData = await response.data
            const filteredUsers = responseData?.filter(usr => usr.role.name === 'student' || usr.role.name === 'librarian');

            dispatch(getUserSuccess(filteredUsers));
        } catch (error) {
            // dispatch(addUserFailure(error));
            dispatch(getUserFailure(error))
        }
    };





    // const filteredUsers = user?.filter(usr => usr.role.name === 'student' || usr.role.name === 'librarian');

    
  
    const searchUserByName=(searchTerm)=>{
        const lowerCaseSearchTerm = searchTerm.toUpperCase();

        
  
        const newData=_.filter(user, (usr) => {
            return (
              usr.first_name.toUpperCase().includes(lowerCaseSearchTerm) ||
              usr.last_name.toUpperCase().includes(lowerCaseSearchTerm)
            )
          });
          if (searchTerm.trim() === '') {
            dispatch(updateFilteredUser(user));
          } else {

            dispatch(updateFilteredUser(newData));
          }
          
        // setUserData(newData)
        // dispatch(updateFilteredUser(newData));
        setStudent(searchTerm)

    }

      //remove user
      const removeUser = async (userID) => {
        try {
          dispatch(delteUserRequest()); // Dispatch delete request action
          await axios.delete(`/user/${userID}`);
          dispatch(deleteUserSuccess(userID)); // Dispatch success action after deletion
        } catch (error) {
          dispatch(deleteUserFailure(error)); // Dispatch failure action if an error occurs
        }
      };
    
    const editUser=async(user_id)=>{
        dispatch(editUserRequest())
        try{
            const response = await axios.put(`/user/${user_id}`, user)
            const updatedResponse = response.data
            dispatch(editUserSuccess(updatedResponse))
        }catch(error){
            dispatch(editUserFailure(error))
        }
    }
    

    const handlePrintButton=(user)=>{
        setSelectedUser(user);
        // navigate(`/library-card/${user.user_id}`, { state: user });

        
    } 
    useEffect(()=>{
        getUser()
    },[])
    
    return(
        <div className="containers">
          <div className="ViewUser___container">
            <div className="userdata___header">
            </div>
            <div className="header___text">
                <h1> User Managment</h1>
            </div>
            <div className="ViewUser___content">
                <div className="content">
                    <div className="card">
                        <div className="card___header">
                            <span className="title">Manage Users</span>
                        </div>
                        <div className="card___body">
                            <div className="row">
                                <div className="search">
                                    <label>Advanced Filter</label>
                                    <input
                                        placeholder="Enter name"
                                        type="text"
                                        value={student}
                                        onChange={(event) => searchUserByName(event.target.value)}
                                    />
                                </div>
                                <div className="user___info">
                                {user?.length > 0 && (
                                    <table className="usertable___info">
                                        <thead>
                                            <tr>
                                                <th><input type ="checkbox"></input></th>
                                                <th>UID</th>
                                                <th>Image</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Phone</th>
                                                <th>Address</th>
                                                <th>Role</th>
                                                <th>Created on</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        { user?.map(user=>(
                                            <tr key={user.user_id}>
                                                <td><input type ="checkbox"></input></td>
                                                <td>{user.user_id}</td>
                                                <td>
                                                    <img
                                                    src={user.user_image_url}
                                                    alt="user Cover"
                                                    className="user-covers"
                                                    />
                                                </td>
                                                <td>{user.first_name}<br></br>{user.last_name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.phone_number}</td>
                                                <td>{user.address}</td>
                                                <td>{user.role.name}</td>
                                                {/* <td>{user.CreatedOn}</td> */}
                                                <td>
                                                <button className="edit___button"  >
                                                <i className="uil uil-edit"></i>
                                                </button>
                                                <button onClick={()=>removeUser(user.user_id)} className="delete___button">
                                                <i className="uil uil-trash-alt"></i>
                                                </button>
                                                
                                                <button className="print___button" onClick={()=>handlePrintButton(user)}>
                                                    <i className="uil uil-print"></i>
                                                </button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                )}
                                {user?.length === 0 && (
                                    <p>No matching users found.</p>
                                )}
                                

                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
        {/* {selectedUser && <LibraryCard user={selectedUser} />} */}
        


        </div>
        
        
        
    )
}
export default ViewUser