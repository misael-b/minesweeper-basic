'use client';
import React, { useRef, useState } from 'react'
import axios from "axios";
import { minesweeper } from '../actions';

const page = () => { 
    const [login, setLogin] = useState({ username: "", password: "" })
    const[errors, setErrors] = useState(false)
    
    const payload = {
        username: login.username,
        password: login.password,
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
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
            if (response.status === 200) {
                minesweeper()
            }
            }
        catch (e) {
            setErrors(true)

        }

    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setErrors(false)
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
            {errors && <p style={{ color: "red" }}>Invalid Credentials</p>}
        </div>
    )
}

export default page