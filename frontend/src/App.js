import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import Home from './pages/home'
import StatsPage from './pages/StatsPage'
import Navbar from './components/Navbar'
import Title from './components/Title'
import Login from './pages/Login';
import Profile from './pages/Profile';
import Calendar from './pages/Calendar';

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
        <Title/>
        <Navbar isAuthenticated={isAuthenticated} />
        <div className = "pages">
          <Routes>
            <Route
              path = "/"
              element = {<Login />}
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
              path = "/trails"
              element = {<Home />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
