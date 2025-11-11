import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import logo from './assets/octofitapp-small.svg';

function Home() {
  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Welcome to OctoFit Tracker</h1>
        <p className="lead text-muted">Track your fitness journey, compete with teams, and achieve your goals!</p>
      </div>
      
      <div className="row g-4 mt-4">
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <div className="mb-3">
                <span className="badge bg-primary" style={{fontSize: '2rem', padding: '1rem'}}>🏃</span>
              </div>
              <h5 className="card-title">Activities</h5>
              <p className="card-text text-muted">Log and track your fitness activities.</p>
              <Link to="/activities" className="btn btn-primary btn-sm mt-2">View Activities</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <div className="mb-3">
                <span className="badge bg-success" style={{fontSize: '2rem', padding: '1rem'}}>👥</span>
              </div>
              <h5 className="card-title">Teams</h5>
              <p className="card-text text-muted">Create and join teams to compete together.</p>
              <Link to="/teams" className="btn btn-success btn-sm mt-2">View Teams</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <div className="mb-3">
                <span className="badge bg-warning" style={{fontSize: '2rem', padding: '1rem'}}>🏆</span>
              </div>
              <h5 className="card-title">Leaderboard</h5>
              <p className="card-text text-muted">See how you rank against others.</p>
              <Link to="/leaderboard" className="btn btn-warning btn-sm mt-2">View Leaderboard</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mt-3">
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body text-center">
              <div className="mb-3">
                <span className="badge bg-info" style={{fontSize: '2rem', padding: '1rem'}}>👤</span>
              </div>
              <h5 className="card-title">Users</h5>
              <p className="card-text text-muted">Manage and view user profiles.</p>
              <Link to="/users" className="btn btn-info btn-sm mt-2">View Users</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body text-center">
              <div className="mb-3">
                <span className="badge bg-danger" style={{fontSize: '2rem', padding: '1rem'}}>💪</span>
              </div>
              <h5 className="card-title">Workouts</h5>
              <p className="card-text text-muted">Discover personalized workout suggestions.</p>
              <Link to="/workouts" className="btn btn-danger btn-sm mt-2">View Workouts</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="OctoFit Logo" style={{width: '40px', height: '40px'}} />
            OctoFit Tracker
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">🏠 Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/activities">🏃 Activities</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">👤 Users</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">👥 Teams</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">🏆 Leaderboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workouts">💪 Workouts</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
