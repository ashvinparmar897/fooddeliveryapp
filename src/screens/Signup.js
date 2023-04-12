import React from 'react'
import { useState } from 'react';
import { Link,useNavigate} from 'react-router-dom';

const Signup = () => {
    const navgate=useNavigate()
    const [credentials, setCredentials] = useState({name:'',email:'',password:'',geolocation:''});
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await fetch('http://localhost:5000/api/createuser',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.geolocation})
        })
        const json=await response.json();
        console.log(json);
        if(!json.success){
            alert('Enter Correct Credentials')
            
        }
        if(json.success){
            navgate('/login')

        }

    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    return (
        <>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChange} />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" className="form-control" name="geolocation" value={credentials.geolocation} onChange={onChange}/>
                    </div>

                    <button type="submit" className=" m-3 btn btn-success">Submit</button>

                    <Link to="/login" className=" m-3 btn btn-danger">Already User</Link>
                </form>
            </div>

        </>
    )
}

export default Signup
