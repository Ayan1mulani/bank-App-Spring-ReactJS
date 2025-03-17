import './Login.css';
import { useEffect, useState } from 'react';
import { fetchPostData } from '../Client/Clinet';
import { useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';

const Account = () => {
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
            const response = await fetchPostData('auth/user/add', LoginID);
            if (response) {
                alert('Account Created Succesfully!');
                navigate('/');
            } else {
                alert('Account creation failed');
            }
        } catch (error) {
            console.error('Erro in Creating:', error);
            alert('Credential failed. Please try again.');
        }
    };

    return (
        <div className='L-body'>
           
            <form onSubmit={handleSubmit} className='login-form'>
            <img src="../2.png" alt=""  className='png'/>
            <h3>CREATE EASY MONEY ACCOUNT</h3>

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

                <button type="submit" className='login-button'>CREATE ACCOUNT</button>

             
            </form>
        </div>
    );
};

export default Account;