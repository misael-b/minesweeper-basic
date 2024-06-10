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
        <div className='login'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} id='form' className='formLogin'>

                <div className="text_area">
                    
                    <label className='text'>Username:</label><br />
                    <input type="text" id="username" name="username" value={login.username}
                        onChange={handleChange} /> <br />
                </div>
                <br />

                
                <div className="text_area">
                    <label>Password:</label> <br />
                    <input type="password" id="password" name="password" value={login.password}
                        onChange={handleChange} /> <br />
                </div>

                
                <div>
                    <button type="submit" className="btn">Login</button>
                </div>
                {errors && <p style={{ color: "red" }}>Invalid Credentials</p>}
                
            </form> 
            <p>Don't have an account? <a href='http://localhost:3000/register'>Sign up</a></p>
            
        </div>
    )
}

export default page