import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Laundry from './pages/Laundry';
import Complaints from './pages/Complaints';
import Attendance from './pages/Attendance';
import FoodMenu from './pages/FoodMenu';
import GuestsDelivery from './pages/GuestsDelivery';
import LeaveApplication from './pages/LeaveApplication';
import PlacesNearYou from './pages/PlacesNearYou';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="content">
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/home" element={<MainContent />} />
              <Route path="/laundry" element={<Laundry />} />
              <Route path="/complaints" element={<Complaints />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/food-menu" element={<FoodMenu />} />
              <Route path="/guests-delivery" element={<GuestsDelivery />} />
              <Route path="/leave-application" element={<LeaveApplication />} />
              <Route path="/places-near-you" element={<PlacesNearYou />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
