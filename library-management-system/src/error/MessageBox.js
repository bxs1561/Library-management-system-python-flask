import React from "react"
import "./MessageBox.css"

function MessageBox(props) {
    return(
        <div style={{boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)"}}className={`alert alert-${props.variant || 'info'}`}>
            {props.children}
        </div>
    )

}
export default MessageBox