import React, {  useState } from 'react';
import './Send.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { fetchPostDataWithAuth } from '../Client/Clinet';


const Send = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const location = useLocation();
  const { name, accNumber } = location.state || {};


  // Format amount with commas and rupee symbol
  const formatAmount = (amount) => {
    if (!amount) return '₹0';
    let formattedAmount = amount.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas every 3 digits
    return `₹${formattedAmount}`;
  };

  // Handle number button clicks
  const handleButtonClick = (value) => {
    if (amount.length < 5 || (amount.length === 5 && parseInt(amount + value) <= 10000)) {
      setAmount((prevAmount) => prevAmount + value);
    }
  };

  // Handle delete button click
  const handleDelete = () => {
    setAmount((prevAmount) => prevAmount.slice(0, -1));
  };


  


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!amount || !accNumber) {
    alert("Please enter an amount and select a recipient.");
    return;
  }

  const payload = {
    amount: amount,
    reciverAccountID: accNumber,
  };

  try {
    const response = await fetchPostDataWithAuth("Transaction/transfer/Money", payload);
    if (response) {
      alert("Transaction Successful!");
      navigate("/");
    } else {
      alert("Transaction failed");
    }
  } catch (error) {
    console.error("Error in transaction:", error);
    alert("Transaction failed. Please try again.");
  }
};


  return (
    <div className="SendMony">
      <div className="top-3">
        <div className="bg-2" onClick={() => navigate(-1)}>&larr;</div>
        <div>
          <p className="txt-1">Make Payment</p>
        </div>
        <div></div>
      </div>

      {/* Receiver Info Section */}
      <div className="receiver-info">
        <p className="receiver-name">{name}</p>
      </div>

      {/* Amount Display */}
      <div className="amount-display">
        <p className="amount-text">{formatAmount(amount)}</p>
      </div>

      {/* Number Pad */}
      <div className="number-pad">
        <div className="number-row">
          <button onClick={() => handleButtonClick('1')}>1</button>
          <button onClick={() => handleButtonClick('2')}>2</button>
          <button onClick={() => handleButtonClick('3')}>3</button>
        </div>
        <div className="number-row">
          <button onClick={() => handleButtonClick('4')}>4</button>
          <button onClick={() => handleButtonClick('5')}>5</button>
          <button onClick={() => handleButtonClick('6')}>6</button>
        </div>
        <div className="number-row">
          <button onClick={() => handleButtonClick('7')}>7</button>
          <button onClick={() => handleButtonClick('8')}>8</button>
          <button onClick={() => handleButtonClick('9')}>9</button>
        </div>
        <div className="number-row">
          <button onClick={() => handleButtonClick('0')}>0</button>
          <button onClick={handleDelete} className="delete-button">DEL</button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="request-btn">Request</button>
        <button className="pay-btn" onClick={handleSubmit}>Pay</button>
      </div>
    </div>
  );
};

export default Send;