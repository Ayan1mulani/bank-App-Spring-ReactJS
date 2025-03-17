import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';  
import Top from './Home/Top';
import Top2 from './Transfer/Top2';
import Animation from './Home/AnimatedCard';
import Home2 from './BorrowMoney/Home2';
import Exchange from './ExchangePage/Exchange';
import Send from './SendMoney.jsx/Send';
import TransactionJ from './History.jsx/TransactionJ';
import Profile from './Profile/Profile';
import Wallet from './Wallet/Wallet';
import Login from './LoginPage/Login';
import BankAccount from './CreateAccount/BankAccount';
import Account from './LoginPage/Account';
import ProtectedRoute from './ProtectedRoute'; // Import ProtectedRoute

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/Create/Account" element={<Account />} /> 

        {/* Protected Routes */}
        <Route path="/Top" element={<ProtectedRoute element={<Top />} />} /> 
        <Route path="/Top/MoneyTransfer" element={<ProtectedRoute element={<Top2 />} />} /> 
        <Route path="/Animation" element={<ProtectedRoute element={<Animation />} />} /> 
        <Route path="/Top/Borrow" element={<ProtectedRoute element={<Home2 />} />} /> 
        <Route path="/exchange" element={<ProtectedRoute element={<Exchange />} />} />
        <Route path="/Top/CreateBankAccount" element={<ProtectedRoute element={<BankAccount />} />} />
        <Route path="/Top/MoneyTransfer/SendMoney" element={<ProtectedRoute element={<Send />} />} />
        <Route path="/history" element={<ProtectedRoute element={<TransactionJ />} />} />
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="/Wallet" element={<ProtectedRoute element={<Wallet />} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;