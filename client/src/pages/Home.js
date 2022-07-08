import React, { useState } from 'react';
import Login from '../components/Auth/Login';
import Signup from '../components/Auth/Signup';
import { useNavigate, Routes, Route } from 'react-router-dom';

const userInputs = { username: '', password: '' };
const initSignUpInputs = {
  username: '',
  password: '',
  confirmPassword: ''
};

export default function Home(props) {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState(userInputs);
  const [signUpInputs, setSignUpInputs] = useState(initSignUpInputs);
  const { signup, login, errMsg } = props;

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignUpInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div style={{textAlign: 'center'}}>
      <div style={{ marginBottom: '30px'}}>
        <h1 style={{ marginTop:'50px'}}>US Army Military Installation Review App <br></br>
          (USAMIRA)
        </h1>
        <button className='login-btn' onClick={() => navigate('/login')}>
          Login
        </button>
        <button className='sign-btn' onClick={() => navigate('/signup')}>
          Sign Up
        </button>
      </div>
      <div>
        <Routes>
          <Route
            path="login"
            element={
              <Login
                handleLoginChange={handleLoginChange}
                inputs={inputs}
                login={login}
                errMsg={errMsg}
              />
            }
          />
          <Route
            path="signup"
            element={
              <Signup
                handleSignupChange={handleSignupChange}
                signUpInputs={signUpInputs}
                signup={signup}
                errMsg={errMsg}
              />
            }
          />
        </Routes>
        <h3 
          style={{
            border:'2px solid red', 
            borderRadius:'5px',
            marginTop:'10px', 
            width:'25%', 
            marginLeft: "auto",
            marginRight: "auto",
            padding:'5px'
          }}
        >
          Expressions and posts in this app do not represent or are approved by the DoD nor the US Army. <br></br>
          If you are sensible to comments, beware when enter.</h3>
      </div>
    </div>
  );
}