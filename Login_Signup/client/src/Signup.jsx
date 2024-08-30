import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Signup() {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [passwordError, setPasswordError] = useState(''); // State for password error message
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const lengthValid = password.length >= 10 && password.length <= 12;
        const specialCharValid = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const digitValid = /\d/.test(password);

        if (!lengthValid) {
            return "Password must be between 10-12 characters long.";
        } else if (!specialCharValid) {
            return "Password must contain at least one special character.";
        } else if (!digitValid) {
            return "Password must contain at least one digit.";
        }
        return "";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errorMessage = validatePassword(password);
        if (errorMessage) {
            setPasswordError(errorMessage); // Display the error message
            return;
        }
        axios.post('http://localhost:3001/register', { name, number, email, password, address })
            .then(response => {
                console.log(response);
                navigate('/login', { state: { email: email } }); // Redirect to login page
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Signup</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input
                            type="text"
                            placeholder="Enter name"
                            autoComplete="off"
                            name="name"
                            className="form-control rounded-0"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="number"><strong>Contact No</strong></label>
                        <input
                            type="text"
                            placeholder="Enter number"
                            autoComplete="off"
                            name="number"
                            className="form-control rounded-0"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            className="form-control rounded-0"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {passwordError && <div className="text-danger">{passwordError}</div>} {/* Display error */}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address"><strong>Address</strong></label>
                        <input
                            type="text"
                            placeholder="Enter address"
                            autoComplete="off"
                            name="address"
                            className="form-control rounded-0"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Register Yourself
                    </button>
                </form>
                <p className="mt-3">
                    Already Have an Account?{" "}
                    <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none mt-2">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;
