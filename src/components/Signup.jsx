import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput
} from 'mdb-react-ui-kit';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';  

import './Signup.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user === '') {
        console.log("");
      }
      console.log("Enregistrement effectuer avec succes");
    } catch (error) {
      setError(error.message);
      console.log("Enregistrement non effectuer ");
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>
              <h2 className="fw-bold mb-2 text-center">Sign Up</h2>
              <p className="text-black-50 mb-3">Create a new account!</p>
              <form onSubmit={handleSignUp}>
                <MDBInput
                  wrapperClass='mb-4 w-100'
                  label='Email address'
                  type='email'
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <MDBInput
                  wrapperClass='mb-4 w-100'
                  label='Password'
                  type='password'
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <MDBBtn size='lg' type='submit'>
                  Sign Up
                </MDBBtn>
              </form>
              {error && <p className="text-danger mt-3">{error}</p>}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default SignUp;
