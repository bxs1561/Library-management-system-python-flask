import React, {useEffect, useState} from "react";
import './EditUser.css'
import { useSelector, useDispatch } from 'react-redux'


function EditUser(){
    const  {user}  = useSelector((state) => state.getUser);

    
    return(
        <div className="edit___user">
            
        </div>

    )
}