// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import Header from '../Header/Header';


// const Exchange = () => {
//     const navigate = useNavigate();
//   const location = useLocation();
//   const rates = location.state?.rates;

//   if (!rates) {
//     return <p>No data available</p>;
//   }

//   // Dark mode styles using CSS variables for flexibility
//   const containerStyle = {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//     padding: '20px',
//     backgroundColor: '#121212',  // Dark background
//     color: '#e0e0e0',  // Light text color for dark mode
//   };

//   const rateItemStyle = {
//     backgroundColor: '#333',  // Dark card background
//     borderRadius: '15px',
//     boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
//     padding: '20px',
//     textAlign: 'center',
//     width: '250px',
//     marginBottom: '20px',
//     transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//     cursor: 'pointer',
//   };



//   const flagStyle = {
//     width: '40px',
//     height: '30px',
//     marginRight: '10px', // Space between the flag and text
//     borderRadius: '5px',
//   };

//   const rateContentStyle = {
//     display: 'flex',
//     alignItems: 'center',  // Align flag, currency, and rate vertically
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//   };

//   const currencyTextStyle = {
//     fontSize: '1.2rem',
//     fontWeight: '600',
//     color: '#fff',  // White text for currency
//   };

//   const rateTextStyle = {
//     fontSize: '1.1rem',
//     fontWeight: '500',
//     color: '#ddd',  // Lighter color for rate
//   };

//   const handleHover = (event) => {
//     event.currentTarget.style.transform = 'scale(1.05)';
//     event.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
//   };

//   const handleLeave = (event) => {
//     event.currentTarget.style.transform = 'scale(1)';
//     event.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
//   };

//   return (
//     <div>
//       <Header heading="Exchange Rates"/>
//     <div style={containerStyle}>

//       {rates.map(({ currency, rate, flagUrl }) => (
//         <div
//           key={currency}
//           style={rateItemStyle}
//           onMouseEnter={handleHover}
//           onMouseLeave={handleLeave}
//         >
//           <div style={rateContentStyle}>
//             <img src={flagUrl} alt={`${currency} flag`} style={flagStyle} />
//             <p style={currencyTextStyle}>{currency}</p>
//             <p style={rateTextStyle}>{rate}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//     </div>
//   );
// };

// export default Exchange;