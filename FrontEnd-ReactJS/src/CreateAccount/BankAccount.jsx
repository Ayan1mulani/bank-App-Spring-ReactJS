import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './create.css';
import { fetchPostDataWithAuth } from '../Client/Clinet';


const BankAccount = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    accountHolderName: '',
    address: '',
    dob: '',
    gender: '',
    occupation: '',
    phoneNo: '',
  });


  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetchPostDataWithAuth ('auth/Create/Bank/Account', formData);
      console.log(response);
      alert('Account created successfully!');
      navigate('/'); 
    } catch (error) {
      console.error(error);
      alert('Failed to create account. Please try again.');
    }
  };

  return (
    <div className="bank-account-form">
      <h2>Create Bank Account</h2>
      <form onSubmit={handleSubmit}>

        <label>Full Name:</label>
        <input type="text" name="accountHolderName" placeholder='Name'  value={formData.accountHolderName} onChange={handleChange} required />

        <label>Address:</label>
        <input type="text" name="address" placeholder='Adress'  value={formData.address} onChange={handleChange} required />

        <label>Date of Birth:</label>
        <input type="date" name="dob"  value={formData.dob} onChange={handleChange} required />

        <label>Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label>Occupation:</label>
        <input type="text" name="occupation" placeholder='Occupation' value={formData.occupation} onChange={handleChange} required />

        <label>Phone Number:</label>
        <input type="tel" name="phoneNo" placeholder='Phone no' value={formData.phoneNo} onChange={handleChange} required />

       

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default BankAccount;