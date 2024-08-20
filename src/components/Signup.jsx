import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from 'mdb-react-ui-kit';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';  
import { toast } from 'react-toastify';
import './Signup.css';
import { Navigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user === '') {
        console.log("");
      }
      toast.success('Successfully Registered')
      Navigate('/Home');
    } catch (error) {
      setError(error.message);
      toast.error('Registration not performed');
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
              <div className="input-wrapper mb-4 w-100">
                  <i className="material-icons-round lock-icon">email</i>
                  <input
                    type="email"
                    placeholder="Email address"
                    className="input-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Champ de mot de passe avec icône de verrou à gauche et option pour montrer/cacher le mot de passe */}
                <div className="input-wrapper mb-4 w-100">
                  <i className="material-icons-round lock-icon">lock</i>
                  <input
                    type={isPasswordShown ? 'text' : 'password'}
                    placeholder="Password"
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <i
                    onClick={() => setIsPasswordShown(prevState => !prevState)}
                    className="material-icons-round eye-icon"
                  >
                    {isPasswordShown ? 'visibility' : 'visibility_off'}
                  </i>
                </div>
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
