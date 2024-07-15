import { useState } from 'react'
import './App.css'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Swap from './pages/swap';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/swap" element={<Swap />} />
      </Routes>
    </Router>
  )
}

export default App
