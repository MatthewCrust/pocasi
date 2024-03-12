import React, { useState } from 'react';
import './App.css';
import HomePage from './HomePage';
import Login from './Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
function App() {
  
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/second-page" element={<HomePage />} />
        </Routes>
      </Router>
    </AuthProvider>

  );
}

export default App;
