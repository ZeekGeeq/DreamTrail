import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import Home from './pages/home'
import StatsPage from './pages/StatsPage'
import Navbar from './components/Navbar'
import Login from './pages/Login';
import Profile from './pages/Profile';
import Calendar from './pages/Calendar';
import Goals from './pages/Goals.js'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/check', { withCredentials: true })
      .then(response => {
        console.log("Authentication Check:", response.data);
        setIsAuthenticated(response.data.authenticated);
      })
      .catch(error => {
        console.error('Failed to check authentication:', error);
      });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar isAuthenticated={isAuthenticated} />
        <div className = "pages">
          <Routes>
            <Route
              path = "/"
              element = {<Home />}
            />
            <Route
              path = "/stats"
              element = {<StatsPage />}
            />
            <Route 
              path="/profile" 
              element={<Profile />} 
            /> 
            <Route 
              path="/calendar" 
              element={<Calendar />} 
            />
            <Route
              path = "/login"
              element = {<Login />}
            />
            <Route
              path = "/goals"
              element = {<Goals />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
