import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonGroup, Button } from '@mui/material';
import { AccountCircle, Public, LogoutRounded } from '@mui/icons-material';

export default function Nav(props) {
  const { logout, token } = props;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigate = useNavigate();

  return (
    <div style={{
        display: 'flex',
        flexDirection:'row',
        padding: '10px',
        backgroundColor: '#4b5320'
      }}
    >
      <div style={{ marginRight: 'auto'}}>
        {/* <Button
          style={{backgroundColor: 'black' }}
          startIcon={<Home />}
          variant="contained"
          size="small"
          onClick={() => navigate('/')}
        >
          Home
        </Button> */}
      </div>

      <div>
        <ButtonGroup variant="contained" style={{gap:'5px'}}>
          {/*begining of conditional view; if there is a token => show navbar buttons */}
          {token && (
            <Button
              style={{backgroundColor: 'black' }}
              startIcon={<AccountCircle />}
              size="small"
              onClick={() => navigate('/profile')}
            >
              Profile
            </Button>
          )}
          {token && (
            <Button
              style={{backgroundColor: 'black' }}
              startIcon={<Public />}
              size="small"
              onClick={() => navigate('/public')}
            >
              The Zone
            </Button>
          )}
          {token && (
            <Button
              style={{backgroundColor: 'black' }}
              startIcon={<LogoutRounded />}
              size="small"
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </ButtonGroup>
      </div>
    </div>
  );
}