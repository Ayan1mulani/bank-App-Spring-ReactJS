import './Home.css' 
import { useNavigate } from 'react-router-dom';


const Operations = ({userDetails}) => {
  const navigate = useNavigate(); 
 
  function clicked() {
    if (userDetails.accountNumber) {
      navigate('./Borrow'); // Navigate to Borrow page if the user has an account
    } else {
      navigate('./CreateBankAccount'); // Navigate to Create Account page if the user doesn't have an account
    }
  }

    
  return (
    <div className='operations-div'>
      <div className='op'>
     <div className='op-1'>
        <div className='bg-1'>
            <p ><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200v-560 560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v100h-80v-100H200v560h560v-100h80v100q0 33-23.5 56.5T760-120H200Zm320-160q-33 0-56.5-23.5T440-360v-240q0-33 23.5-56.5T520-680h280q33 0 56.5 23.5T880-600v240q0 33-23.5 56.5T800-280H520Zm280-80v-240H520v240h280Zm-160-60q25 0 42.5-17.5T700-480q0-25-17.5-42.5T640-540q-25 0-42.5 17.5T580-480q0 25 17.5 42.5T640-420Z"/></svg></p>
            </div>
           <div className='op-div'> 
            <p className='op-t-1'>Total Balance</p>
            <p className='op-t-3'>₹{userDetails.totalBalance}</p>
            <div className='line'>
                <div className='line1'></div>
                <div className='line2'></div>
                <div className='line3'></div>
                <div className='line4'></div>
            </div>
            </div>
        </div>
      </div>
      <div className='op'>
      <div className='op-1'>
            <div className='op-div'>
            <div className='bg-1'>
            <p><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M760-400v-260L560-800 360-660v60h-80v-100l280-200 280 200v300h-80ZM560-800Zm20 160h40v-40h-40v40Zm-80 0h40v-40h-40v40Zm80 80h40v-40h-40v40Zm-80 0h40v-40h-40v40ZM280-220l278 76 238-74q-5-9-14.5-15.5T760-240H558q-27 0-43-2t-33-8l-93-31 22-78 81 27q17 5 40 8t68 4q0-11-6.5-21T578-354l-234-86h-64v220ZM40-80v-440h304q7 0 14 1.5t13 3.5l235 87q33 12 53.5 42t20.5 66h80q50 0 85 33t35 87v40L560-60l-280-78v58H40Zm80-80h80v-280h-80v280Z"/></svg></p>
            </div>
            <p className='op-t-1'>CONSUMER LOAN</p>
            </div>
            <div className='op-div' onClick={clicked}>
            <p className='op-t-3'>₹{userDetails.borrowedMoney}</p>
            <div className='due-box'>{userDetails.accountNumber?"Borrow Money": "Create Bank Accoumt"}</div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Operations
