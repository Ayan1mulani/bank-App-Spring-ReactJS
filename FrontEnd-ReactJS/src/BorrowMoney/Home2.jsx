import React, { useState } from 'react';
import './Borrow.css';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom'; 

import { fetchPostDataWithAuth } from '../Client/Clinet';

const Home2 = () => {
    const navigate = useNavigate(); 
  
  // State for Borrowing details
  const [BorrowID, setBorrowID] = useState({
    duration: 0 ,
    amount: 0 , // Default amount to avoid empty state
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure both fields are filled and valid
    if (!BorrowID.amount || !BorrowID.duration) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetchPostDataWithAuth('Transaction/Borrow/Money', BorrowID);
      
        alert('Borrowed Money Successfully');
        navigate('/Top');  
      } catch (error) {
      console.error('Error borrowing money:', error);
      alert('Borrowing failed. Please try again.');
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBorrowID((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // EMI Calculation
  const calculateEMI = (principal, rate, tenure) => {
    const monthlyRate = rate / 12 / 100;
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1);
    return emi.toFixed(2);
  };

  const emiPlan = calculateEMI(BorrowID.amount, 10, BorrowID.duration || 12); // Default to 12 months if undefined

  return (
    <div>
      <Header heading="Borrow Money" />
      <p className="Amount-txt body2">Borrow Amount</p>
      <p className="Amount-txt2 body2">₹ {Number(BorrowID.amount).toLocaleString()}</p>

      <div className="rangediv">
        <input
          className="range"
          type="range"
          name="amount"
          min="100"
          max="10000"
          step="100"
          value={BorrowID.amount}
          onChange={handleChange}
        />
      </div>

      <div className="Box3">
        <div className='box-in-style'>
          <p>Select Repay Plan</p>
          <select name="duration" value={BorrowID.duration} onChange={handleChange}>
            <option value="">Select Plan</option>
            <option value="3">3 months</option>
            <option value="6">6 months</option>
            <option value="12">12 months</option>
          </select>
        </div>

        <div className='box-in-style'>
          <p>Loan protection (inc. GST)</p>
          <p>₹ 30</p>
        </div>

        <div className='box-in-style'>
          <p>EMI Plan</p>
          <p>₹ {Number(emiPlan).toLocaleString()} / month</p>
        </div>
      </div>

      <div className='Continue-btn'>
        <button onClick={handleSubmit}>Continue</button>
      </div>
    </div>
  );
};

export default Home2;