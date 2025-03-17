import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation and useNavigate
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import HomeIcon from '@mui/icons-material/Home';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

const Bottom = () => {
    const navigate = useNavigate(); // React Router's navigation hook
    const location = useLocation(); // Hook to get current location
    const [value, setValue] = React.useState(location.pathname); // Set default value based on the current path

    // Sync value state with the location pathname
    useEffect(() => {
        setValue(location.pathname);
    }, [location.pathname]);

    const handleChange = (event, newValue) => {
        setValue(newValue); // Update selected value
        navigate(newValue); // Navigate to the corresponding route
    };

    return (
        <BottomNavigation 
          sx={{
            width: '100%', 
            backgroundColor: '#15171C', 
            position: 'fixed', 
            bottom: 0, 
          }} 
          value={value} 
          onChange={handleChange}
        >
       
          <BottomNavigationAction
            label="Wallet"
            value="/wallet" // Route for "Wallet"
            sx={{
              color: value === '/wallet' ? '#E54C70' : 'grey',
              '&:hover': { color: '#E54C70' },
            }}
            icon={<AccountBalanceWalletIcon />}
          />
             <BottomNavigationAction
            label="Home"
            value="/" // Route for "Home"
            sx={{
              color: value === '/' ? '#E54C70' : 'grey',
              '&:hover': { color: '#E54C70' },
            }}
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            label="History"
            value="/history"
            sx={{
             
              color: value === '/history' ? '#E54C70' : 'grey',
              '&:hover': { color: '#E54C70' },
            }}
            icon={<CompareArrowsIcon />}
          />
        </BottomNavigation>
    );
};

export default Bottom;