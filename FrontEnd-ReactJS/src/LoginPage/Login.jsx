import './Login.css';
import { useEffect, useState } from 'react';
import { fetchPostData } from '../Client/Clinet';
import { useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';

const Login = () => {
    const navigate = useNavigate();

    const [LoginID, setLoginID] = useState({
        email: 'AyanMulani158@gmail.com',
        password: '12511413',
    });

    // Validate token on component mount
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            navigate('/Top');
        }
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginID((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!LoginID.email || !LoginID.password) {
            alert('Please fill in both fields.');
            return;
        }

        try {
            const response = await fetchPostData('auth/token', LoginID);
            if (response.data.token) {
                sessionStorage.setItem('token', response.data.token);
                alert('Login successful!');
                navigate('/Top');
            } else {
                alert('Login failed. Invalid credentials.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Credential failed. Please try again.');
        }
    };

    return (
        <div className='L-body'>
           
            <form onSubmit={handleSubmit} className='login-form'>
            <img src="./Bank.png" alt="Bank Logo"  className='png'/>
            <h3>LOGIN EASY MONEY</h3>

                <div className='input-container'>
                    <EmailIcon className="input-icon" />
                    <input
                        className='input-field'
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={LoginID.email}
                        onChange={handleChange}
                    />
                </div>

                <div className='input-container'>
                    <PasswordIcon className="input-icon" />
                    <input
                        className='input-field'
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={LoginID.password}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className='login-button'>Login</button>

                <p className='register-text'>
                    Don’t have an account? <span className='register-link' onClick={() => navigate('/Create/Account')}>Create account</span>
                </p> 
            </form>
        </div>
    );
};

export default Login;