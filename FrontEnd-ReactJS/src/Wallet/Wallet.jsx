import React, { useState } from "react";
import "./Wallet.css";
import Bottom from "../Home/Bottom";
import { useNavigate } from 'react-router-dom'; 
import Header from "../Header/Header";


const Wallet = () => {
  const [showAmounts, setShowAmounts] = useState(false);

  const toggleAmounts = () => {
    setShowAmounts((prev) => !prev);
  };

    const navigate = useNavigate(); 
  

  return (
    <div>
    <Header heading="Wallet-Setting"/>
      <div className="wallet-container">
        {/* Profile Section */}
        <div className="profile-section">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="profile-image"
          />
          <h2 className="profile-name">John Doe</h2>
          <button onClick={() => navigate('/profile')} className="update-button">Update Profile</button>
        </div>

        {/* Balance and Loan Section */}
        <div className="balance-loan-section">
          <div className="wallet-card">
            <h4>Wallet Balance</h4>
            <div className="amount-row">
              <p className="wallet-amount">
                {showAmounts ? "₹50,000" : "*****"}
              </p>
              <button className="eye-button" onClick={toggleAmounts}>
                {showAmounts ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          <div className="wallet-card">
            <h4>Loan Taken</h4>
            <div className="amount-row">
              <p className="loan-amount">
                {showAmounts ? "₹20,000" : "*****"}
              </p>
              <button className="eye-button" onClick={toggleAmounts}>
                {showAmounts ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
        </div>

        {/* Options Section */}
        <div className="options-section">
          <div  onClick={() => navigate('/history')}  className="option-card">
            <h5>View Transactions</h5>
          </div>
          <div  onClick={() => navigate('/MoneyTransfer')}  className="option-card">
            <h5>Transfer Funds</h5>
          </div>
          <div onClick={() => navigate('/Borrow')}  className="option-card">
            <h5>Top Up Wallet</h5>
          </div>
          <div onClick={() => navigate('/history')}  className="option-card">
            <h5>Wallet Settings</h5>
          </div>
        </div>
      </div>

      <div className="btm">
        <Bottom />
      </div>
    </div>
  );
};

export default Wallet;