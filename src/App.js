import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import Login from './components/Login';
import SignUp from './components/Signup';
import Home from './components/Home';
import Goals from './components/Goals';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress'; 

const App = () => {
  const { user, loading } = useAuth(); 

  if (loading) {
    return (
      <div style={styles.spinnerContainer}>
        <CircularProgress color="primary" /> {/* Spinner animé */}
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/home" />} />
        <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/home" />} />
        <Route path="/goals" element={user ? <Goals /> : <Navigate to="/login" />} /> 

        <Route path="/" element={<Navigate to={user ? "/home" : "/login"} />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

const styles = {
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
};

// Assigner la fonction à une variable avant l'export
const AppWithAuthProvider = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWithAuthProvider;
