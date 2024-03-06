import React, { useState } from 'react'
// import { useHistory } from 'react-router-dom'
// useHistory Is Changed To useNavigate In v6
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    // let history = useHistory();
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = credentials;
        if (password === confirmPassword) {
            const url = `http://localhost:5000/api/auth/register`
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });
            const json = await response.json();
            console.log(json);
            if (json.success) {
                // Save The Auth Token And Redirect
                localStorage.setItem('Token', json.authtoken);
                navigate('/');
                props.showAlert("Account Created SuccessFully!", "success");
            }
            else {
                props.showAlert("Invalid Details", "danger");
            }
        }
        else {
            props.showAlert("Password And Confirm Password Must Be Same", "danger");
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container my-3'>
            <h2>Sign Up</h2>
            <form className='my-4' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' value={credentials.name} aria-describedby="emailHelp" onChange={onChange} required minLength={3} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email} aria-describedby="emailHelp" onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} required minLength={5} />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmPassword" name='confirmPassword' value={credentials.confirmPassword} onChange={onChange} required minLength={5} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup