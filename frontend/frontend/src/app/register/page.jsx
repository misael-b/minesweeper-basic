'use client';
import React, { useRef, useState } from 'react'
import axios from "axios";
import { minesweeper } from '../actions';


const page = () => {
    const [register, setRegister] = useState({ username: "", password: "" , verifyPassword: ""})
    const [errors, setErrors] = useState(false)
    const [errorsPassword, setErrorsPassword] = useState(false)
    const [errorsNull, setErrorsNull] = useState(false)

    const payload = {
        username: register.username,
        password: register.password,
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(register);
        try {
            if (register.username.trim() === "" || register.password.trim() === "" || register.verifyPassword.trim() === "") {
                setErrorsNull(true)
            } else {
                if (register.password === register.verifyPassword) {
                    const response = await axios.post(
                        'http://localhost:8080/user/register',
                        payload,
                        {
                            headers: {
                                accept: "*/*",
                                'Content-Type': 'application/json',
                            },
                        }
                    )
                    if (response.status === 200) {
                        minesweeper()
                    }

                } else {
                    setErrorsPassword(true)
                }
            }
            
            
        } catch (e) {
            console.log("username already exists")
            setErrors(true)

        }
        

    }

    const handleChange = (event) => {
        setErrors(false)
        setErrorsPassword(false)
        setErrorsNull(false)
        const { name, value } = event.target;
        setRegister(prevUser => ({ ...prevUser, [name]: value }));
    };


    
    return (
        <div className='login'>
            <h1>Register: </h1>
            <form onSubmit={handleSubmit} id='form' className='formLogin'>

                <div className="text_area">
                    <label>Username:</label><br />
                    <input type="text" id="username" name="username" value={register.username}
                        onChange={handleChange} /> <br />
                </div><br />

                <div className="text_area">
                    <label>Password:</label> <br />
                    <input type="password" id="password" name="password" value={register.password}
                        onChange={handleChange} /> <br />
                </div><br />

                <div className="text_area">
                    <label>Verify Password:</label> <br />
                    <input type="password" id="verifyPassword" name="verifyPassword" value={register.verifyPassword}
                        onChange={handleChange} /> 
                </div>
                
                <button type="submit" className="btn">Submit</button>
                {errors && <p style={{ color: "red" }}>Username Already Exists! Enter Another Username.</p>}
                {errorsPassword && <p style={{ color: "red" }}>Passwords Do Not Match. Try Again.</p>}
                {errorsNull && <p style={{ color: "red" }}>All fields Are Required!</p>}
            </form> 
            <p>Already have an account? Sign in <a href='http://localhost:3000/login'>here</a></p>
            
        </div>
    )
 }

export default page