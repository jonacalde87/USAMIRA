import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, TextField, } from '@mui/material';

export default function Signup(props) {
  const { handleSignupChange, signUpInputs, signup, errMsg } = props;
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (signUpInputs.password !== signUpInputs.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    signup(signUpInputs);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '350px',
        margin: '0 auto',
        padding: '25px',
      }}
    >
      <p style={{color:"red", margin:'5px'}}>{errMsg}</p>
     
        <TextField
          label="Username"
          name="username"
          required
          value={signUpInputs.username}
          onChange={handleSignupChange}
        />
        <TextField
          label="Password"
          name="password"
          required
          type="password"
          value={signUpInputs.password}
          onChange={handleSignupChange}
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          required
          autoComplete="off"
          type="password"
          value={signUpInputs.confirmPassword}
          onChange={handleSignupChange}
        />
      
      <ButtonGroup
        variant="contained"
        style={{ display: 'flex', flexDirection: 'column', gap:'5px', marginTop:'5px'  }}
      >
        <Button style={{backgroundColor:'#4b5320'}} onClick={handleSignup}>Signup</Button>
        <Button style={{backgroundColor:'#4b5320'}} onClick={() => navigate('/login')}>
          Already a member? Login Here
        </Button>
      </ButtonGroup>
    </div>
  );
}