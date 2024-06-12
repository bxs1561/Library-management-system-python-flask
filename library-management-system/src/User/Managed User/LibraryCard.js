import React, {useEffect, useState} from "react";
import person1 from "../../images/person1.jpg"
import "./LibraryCard.css"
import { useLocation } from "react-router-dom";


/**
 * Create Library Card Component.
 */
function LibraryCard(){
  const location = useLocation();
  const user = location.state;

  return(
    <div className="LibraryCard">
      <div className="ID___card">
        <div className="Library___body">
          <h3>Library Card</h3>
          <div className="image">
            <img src={user?.user_image_url} alt="user Cover" className="librarycard___image" />
          </div>
        {/* <h2>{user?.first_name}</h2> */}
          <p>
            <strong>Student ID:</strong> {user?.user_id}
          </p>
          <p>
            <strong>name:</strong> {user?.first_name}
          </p>
          <div className="additional-info">
            <p>
            <strong>University Of Somewhere</strong>
            </p>
            <hr/>
            <p><strong>Register at cleveland,oh</strong></p>
          <p>
            {/* <strong>Library Member Since:</strong> {user.CreatedOn} */}
          </p>
          </div>
      </div>
    </div>
  </div>
  )
}
export default LibraryCard