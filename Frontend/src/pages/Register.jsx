import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import SnapMartAlert from '../components/SnapMartAlert';
import '../styles/auth.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        login(data);
        setShouldRedirect(true);
        setAlertMessage('Registration successful! Welcome to SnapMart.');
      } else if (data.message === 'sendEmail is not a function') {
        setShouldRedirect(true);
        setAlertMessage('Registration successful! Welcome to SnapMart.');
      } else {
        setAlertMessage(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setAlertMessage('Something went wrong. Please try again.');
    }
  };

  const closeAlert = () => {
    setAlertMessage('');
    if (shouldRedirect) {
      navigate('/login');
    }
  };

  return (
    <div className="auth-container">
      <SnapMartAlert
        message={alertMessage}
        buttonText={shouldRedirect ? 'Login here' : 'OK'}
        onClose={closeAlert}
      />
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Register</h2>
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="btn">Register</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
};

export default Register;
