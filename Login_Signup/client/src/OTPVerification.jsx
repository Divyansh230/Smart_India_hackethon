import { useState } from "react";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";

function OTPVerification() {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const location = useLocation(); // To get the passed email from previous page

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = location.state.email; // Getting the email passed from login/signup

        axios.post('http://localhost:3001/verify-otp', { email, otp })
            .then(response => {
                if (response.data === 'Success') {
                    navigate('/home'); // Navigate to the game page or dashboard after successful OTP verification
                } else {
                    alert('Invalid or Expired OTP');
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>OTP Verification</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="otp"><strong>Enter OTP</strong></label>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            autoComplete="off"
                            name="otp"
                            className="form-control rounded-0"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Verify OTP
                    </button>
                </form>
            </div>
        </div>
    );
}

export default OTPVerification;
