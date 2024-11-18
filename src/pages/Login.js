import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo1.png';
import './Login.css'; // Import the external CSS file

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // Toggle visibility of the password
    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5001/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.message || 'Login failed. Please check your credentials.');
                return;
            }

            const data = await response.json();

            if (data.success) {
                onLogin();
                navigate('/home');
            } else {
                alert(data.message || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-left">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label htmlFor="username">User-Name</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
    <label htmlFor="password">Password</label>
    <div className="password-container">
        <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        {/* Eye Icon */}
        <span
            className="toggle-password-icon"
            onClick={togglePasswordVisibility}
            role="button"
            aria-label="Toggle Password Visibility"
        >
            {showPassword ? (
                <i className="fas fa-eye-slash"></i>
            ) : (
                <i className="fas fa-eye"></i>
            )}
        </span>
    </div>
</div>

                    <button type="submit" className="login-btn">Login</button>
                </form>
            </div>
            <div className="login-right">
                <img src={logo} alt="Hostel Hive Logo" className="logo1" />
                <h1>HOSTEL HIVE</h1>
            </div>
        </div>
    );
};

export default Login;
