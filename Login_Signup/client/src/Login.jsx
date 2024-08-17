import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import axios from 'axios'; // Import axios
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login submission logic here, e.g., authenticate the user
        axios.post('http://localhost:3001/login', { email, password })
            .then(response => {
                console.log(response);
                if(response.data==='Success')
                navigate('./home')
                // Handle successful login, e.g., redirect user, store token, etc.
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            className="form-control rounded-0"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Login
                    </button>
                </form>
                <p className="mt-3">
                    Don't Have an Account?{" "}
                    <Link to="/" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none mt-2">
                        Signup
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
