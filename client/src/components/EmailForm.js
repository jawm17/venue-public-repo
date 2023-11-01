import React, { useState } from 'react';
import arrow from "../assets/rightArrow.png";
import "./styles/authWindowStyle.css";

const EmailForm = ({ onEmailSubmit, disabled }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        if(email) {
            e.preventDefault();
            onEmailSubmit(email);
        }
    };

    return (
        <div id="emailInputArea">
            <form onSubmit={handleSubmit}>
                <input onChange={(e) => setEmail(e.target.value)} id="emailInput" placeholder="enter your email" />
                <div id="emailSubmit" onClick={handleSubmit}>
                    <img id="submitArrow" src={arrow} alt="submit"></img>
                </div>
            </form>
        </div>
    );
};

export default EmailForm;
