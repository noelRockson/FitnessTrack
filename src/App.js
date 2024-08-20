import React, { useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider , useAuth} from './components/AuthContext';
import Login from './components/Login';
import SignUp from './components/Signup';
import Home from './components/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { user, checkUser } = useAuth(); // Utilisez le hook pour obtenir l'utilisateur et la méthode de vérification

  useEffect(() => {
    checkUser(); // Vérifiez l'état de l'utilisateur au démarrage
  }, [checkUser]);
  
  return (
    <Router>
      <Routes>
        {/* <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Navigate to="/home" />} /> */}
        <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/home" />} />
        <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/home" />} />
        <Route path="/" element={<Navigate to={user ? "/home" : "/login"} />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

// Assigner la fonction à une variable avant l'export
const AppWithAuthProvider = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWithAuthProvider;
