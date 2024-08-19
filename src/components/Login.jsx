import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from './firebase';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Connexion reussie");
    } catch (error) {
      setError(error.message);
      console.log("Connexion echouee");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("Connexion reussie");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      console.log("Connexion reussie");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>
              <h2 className="fw-bold mb-2 text-center">Sign in</h2>
              <p className="text-black-50 mb-3">Please enter your login and password!</p>
              <form onSubmit={handleLogin}>
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
                <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />
                <MDBBtn size='lg' type='submit'>
                  Login
                </MDBBtn>
              </form>
              {error && <p className="text-danger mt-3">{error}</p>}
              <hr className="my-4" />
              <MDBBtn className="mb-2 w-100" size="lg" style={{ backgroundColor: '#dd4b39' }} onClick={handleGoogleLogin}>
                <MDBIcon fab icon="google" className="mx-2" />
                Sign in with Google
              </MDBBtn>
              <MDBBtn className="mb-4 w-100" size="lg" style={{ backgroundColor: '#3b5998' }} onClick={handleFacebookLogin}>
                <MDBIcon fab icon="facebook-f" className="mx-2" />
                Sign in with Facebook
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
