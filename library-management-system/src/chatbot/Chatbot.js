import React, { useEffect, useState } from "react";
import axios from '../API/axios';
import './Chatbot.css'; // Import CSS file for styling

function Chatbot() {
    const [userInput, setUserInput] = useState('');
    const [chat, setChat] = useState([]);

    const sendMessage = async () => {
        try {
            if (userInput.trim() !== '') {
                const response = await axios.post('/chatbot', {
                    user_query: userInput
                });
                if (response.data.response !== "") {
                    setChat(prevChat => [...prevChat, { text: userInput, sender: 'user' }]);
                    setChat(prevChat => [...prevChat, { text: response.data.response, sender: 'bot' }]);
                }
                setUserInput('');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        // Send initial message when component mounts
        sendMessage();
    }, []);

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {chat.map((message, index) => (
                    <div key={index} className={`message ${message.sender}`}>
                        {message.sender}: {message.text}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="Type your message" />
                <button style={{width:"auto"}} onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Chatbot;
