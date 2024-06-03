'use client';
import React, { useRef, useState } from 'react'
import axios from "axios";

const page = () => { 
    const [login, setLogin] = useState({ username: "", password: "" })
    
    const payload = {
        username: login.username,
        password: login.password,
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(login)
        try {
            const response = await axios.post(
                'http://localhost:8080/user/login',
                payload,
                {
                    headers: {
                        accept: "*/*",
                        'Content-Type': 'application/json',
                    },
                })
            }
        catch (e) {
            console.log("Incorrect Credentials, Try Again")

        }

    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLogin(prevUser => ({ ...prevUser, [name]: value }));
    };

    return (
        <div>
            <form onSubmit={handleSubmit} id='form'>
                <label>Username:</label><br />
                <input type="text" id="username" name="username" value={login.username}
                    onChange={handleChange} /> <br />

                <label>Password:</label> <br />
                <input type="password" id="password" name="password" value={login.password}
                    onChange={handleChange} /> <br />
                
                <button type="submit">Login</button>
            </form> 
        </div>
    )
}

export default page