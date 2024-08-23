import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCheckbox,
  MDBIcon
} from 'mdb-react-ui-kit';
import { signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from './firebase';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import { toast } from 'react-toastify';
import image1 from '../assets/pictures/athlete-male.jpg';
import image2 from '../assets/pictures/beautiful-body.jpg';
import image3 from '../assets/pictures/blonde-workout.jpg';
import image4 from '../assets/pictures/girl-workout.jpg';
import image5 from '../assets/pictures/muscle.jpg';
import image6 from '../assets/pictures/muscle2.jpg';
import image7 from '../assets/pictures/swim-pool.jpg';
import image8 from '../assets/pictures/swimmer-olympian.jpg';
import image9 from '../assets/pictures/swimming-pool.jpg';
import image10 from '../assets/pictures/woman-workout.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Connexion réussie !');
      navigate('/Home');
    } catch (error) {
      toast.error('Connexion échouée');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      if (window.innerWidth <= 768) {
        await signInWithRedirect(auth, googleProvider);
        toast.success('Connexion réussie !');
        navigate('/');
      } else {
        await signInWithPopup(auth, googleProvider);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      console.log("Connexion réussie");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    
    <MDBContainer fluid>
      <div className="background-carousel">
        <img src={image1} alt="Fitness 1" />
        <img src={image2} alt="Fitness 2" />
        <img src={image3} alt="Fitness 3" />
        <img src={image4} alt="Fitness 4" />
        <img src={image5} alt="Fitness 5" />
        <img src={image6} alt="Fitness 6" />
        <img src={image7} alt="Fitness 7" />
        <img src={image8} alt="Fitness 8" />
        <img src={image9} alt="Fitness 9" />
        <img src={image10} alt="Fitness 10" />
      </div>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>
              <h2 className="fw-bold mb-2 text-center">Sign in</h2>
              <p className="text-black-50 mb-3">Please enter your login and password!</p>
              <form onSubmit={handleLogin}>
                {/* Champ d'email avec icone a gauche */}
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

                {/* Champ de mot de passe avec icone de verrou a gauche et option pour montrer/cacher le mot de passe */}
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

              <div className="signup-container">
                <span className="signup-text">Don't have an account? </span>
                <Link to="/signup">
                  <MDBBtn color="link" size="lg" className="signup-button p-0">
                    Sign Up
                  </MDBBtn>
                </Link>
              </div>

            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
