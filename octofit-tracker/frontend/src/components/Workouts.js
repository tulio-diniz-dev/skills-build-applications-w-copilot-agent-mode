import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
    console.log('Workouts API Endpoint:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Workouts fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching workouts:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const getDifficultyBadge = (difficulty) => {
    const diff = (difficulty || '').toLowerCase();
    if (diff === 'easy' || diff === 'beginner') return 'bg-success';
    if (diff === 'medium' || diff === 'intermediate') return 'bg-warning';
    if (diff === 'hard' || diff === 'advanced') return 'bg-danger';
    return 'bg-secondary';
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading workouts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">⚠️ Error Loading Workouts</h4>
          <p>{error}</p>
          <hr />
          <p className="mb-0">Please check your backend connection and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>💪 Workouts</h2>
        <button className="btn btn-danger" onClick={() => setShowModal(true)}>
          <span>➕</span> Add Workout
        </button>
      </div>

      {workouts.length === 0 ? (
        <div className="empty-state card">
          <div className="card-body text-center py-5">
            <div className="empty-state-icon">🏋️</div>
            <h4>No Workouts Found</h4>
            <p className="text-muted">Discover personalized workout suggestions to get started!</p>
            <button className="btn btn-danger mt-3" onClick={() => setShowModal(true)}>Browse Workouts</button>
          </div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-striped align-middle">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Workout Name</th>
                <th scope="col">Description</th>
                <th scope="col" className="text-center">Duration</th>
                <th scope="col" className="text-center">Difficulty</th>
                <th scope="col" className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout.id}>
                  <th scope="row">{workout.id}</th>
                  <td><strong>{workout.name || 'N/A'}</strong></td>
                  <td>{workout.description || 'No description'}</td>
                  <td className="text-center">
                    <span className="badge bg-info">
                      ⏱️ {workout.duration || 'N/A'}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className={`badge ${getDifficultyBadge(workout.difficulty)}`}>
                      {workout.difficulty || 'N/A'}
                    </span>
                  </td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-danger me-2">Start</button>
                    <button className="btn btn-sm btn-outline-secondary">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {workouts.length > 0 && (
        <div className="mt-3 text-muted">
          <small>Total Workouts: <strong>{workouts.length}</strong></small>
        </div>
      )}

      {/* Add Workout Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Workout</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="workoutName" className="form-label">Workout Name</label>
                    <input type="text" className="form-control" id="workoutName" placeholder="e.g., Full Body HIIT" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="workoutDescription" className="form-label">Description</label>
                    <textarea className="form-control" id="workoutDescription" rows="3" placeholder="Describe the workout..."></textarea>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="workoutDuration" className="form-label">Duration</label>
                      <input type="text" className="form-control" id="workoutDuration" placeholder="e.g., 30 mins" />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="workoutDifficulty" className="form-label">Difficulty</label>
                      <select className="form-select" id="workoutDifficulty">
                        <option value="">Select difficulty...</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="workoutCalories" className="form-label">Estimated Calories Burned</label>
                    <input type="number" className="form-control" id="workoutCalories" placeholder="e.g., 250" />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="button" className="btn btn-danger">Add Workout</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Workouts;
