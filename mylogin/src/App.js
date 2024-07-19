import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import MyBestSongs from './components/MyBestSongs';
import MyBestGames from './components/MyBestGames';
import ProtectedRoute from './components/ProtectedRoute';
import { authenticate, signUp } from './services/auth';

const App = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async (credentials) => {
    try {
      const userData = await authenticate(credentials);
      setUser(userData);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignUp = async (formData) => {
    try {
      const userData = await signUp(formData);
      setUser(userData);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    setUser(null);
    // Optionally clear any user session data or tokens here
  };

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp onSignUp={handleSignUp} />} />
          <Route path="/my-best-songs" element={<ProtectedRoute element={MyBestSongs} user={user} />} />
          <Route path="/my-best-games" element={<ProtectedRoute element={MyBestGames} user={user} />} />
          <Route path="/" element={user ? <AuthenticatedHome user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

const AuthenticatedHome = ({ user, onLogout }) => (
  <div className="text-center">
    <h1 className="text-4xl">Welcome, {user.name}</h1>
    <button onClick={onLogout} className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
      Logout
    </button>
    {/* Add more components or logic for authenticated users */}
  </div>
);

export default App;
