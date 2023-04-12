import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/loginuser', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        })
        const json = await response.json();
        console.log(json);
        if (!json.success) {
            alert('Enter Correct Credentials')
        } else {
            localStorage.setItem('userEmail', credentials.email)
            localStorage.setItem("authToken", json.authToken)
            console.log(localStorage.getItem("authToken"))
            navigate('/')
        }

    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
            
            <div className='container' >
                <form onSubmit={handleSubmit} >

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} />
                    </div>


                    <button type="submit" className=" m-3 btn btn-success">Submit</button>

                    <Link to="/signup" className=" m-3 btn btn-danger">New User</Link>
                </form>
            </div >

        </>
    )
}

export default Login
