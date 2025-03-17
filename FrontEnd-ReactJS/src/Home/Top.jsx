import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import LogoutIcon from '@mui/icons-material/Logout';
import './Home.css';
import Operations from './Operation';
import QuckTransfer from './QuckTransfer';
import ExchangeRates from './ExchangeRates';
import Bottom from './Bottom';
import { fetchGetDataWithAuth } from '../Client/Clinet';
import AnimatedCard from './AnimatedCard';

const Home = () => {
  const navigate = useNavigate(); 

  const [userDetails, setUserDetails] = useState({});

 
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const data = await fetchGetDataWithAuth('auth/Logged/user/details');
        console.log("Fetched user details:", data);
        setUserDetails(data ); 
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    getUserDetails();
  }, []); 
    const handleNotification = (e) => {
      navigate('/history');
    };

    const handelLogout = ()=>
{
  sessionStorage.removeItem('token');
  alert("Click ok to Logout")
  navigate('/')


} 

{
  sessionStorage.setItem('AccountNumber', userDetails.accountNumber);

}



  return (
    <div className='main'>
      <div className='top-1'>
        <div className='box1' onClick={()=>navigate('/profile')}>
          {/* <img
            className='img'
            src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
          /> */}
               <p>{userDetails.accountHolderName?userDetails.accountHolderName: "Guest User" }</p>
               </div>

        <div className='top-icons'>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
          </div>
          <div onClick={handleNotification}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
              <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
            </svg>
          </div>
          <div onClick={handelLogout}>
          <LogoutIcon/>
          </div>
          
        </div>
      </div>

     
 <div className='div-88'>
 <AnimatedCard userDetails={userDetails }/> 
 </div>
     
      <Operations userDetails={userDetails} />
      <QuckTransfer />
      <ExchangeRates />
      <div className='btm'>
        <Bottom />
      </div>
    </div>
  );
};

export default Home;