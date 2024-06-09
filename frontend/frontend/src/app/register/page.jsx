'use client';
import React, { useRef, useState } from 'react'
import axios from "axios";


const page = () => {
    const [register, setRegister] = useState({ username: "", password: "" , verifyPassword: ""})
    const [errors, setErrors] = useState(false)
    const [errorsPassword, setErrorsPassword] = useState(false)

    const payload = {
        username: register.username,
        password: register.password,
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(register)
        try {
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
            } else {
                setErrorsPassword(true)
            }
            
        } catch (e) {
            console.log("username already exists")
            setErrors(true)

        }
        

    }

    const handleChange = (event) => {
        setErrors(false)
        setErrorsPassword(false)
        const { name, value } = event.target;
        setRegister(prevUser => ({ ...prevUser, [name]: value }));
    };


    
    return (
        <div>
            <h1>Register: </h1>
            <form onSubmit={handleSubmit} id='form'>
                <label>Username:</label><br/>
                <input type="text" id="username" name="username" value={register.username}
                    onChange={handleChange} /> <br />
                
                <label>Password:</label> <br/>
                <input type="password" id="password" name="password" value={register.password}
                    onChange={handleChange} /> <br />
                
                <label>Verify Password:</label> <br />
                <input type="password" id="verifyPassword" name="verifyPassword" value={register.verifyPassword}
                    onChange={handleChange} /> <br /><br />
                
                <button type="submit">Submit</button>
            </form> 
            {errors && <p style={{ color: "red" }}>Username Already Exists! Enter Another Username.</p>}
            {errorsPassword && <p style={{ color: "red" }}>Passwords Do Not Match. Try Again.</p>}
        </div>
    )
 }

export default page