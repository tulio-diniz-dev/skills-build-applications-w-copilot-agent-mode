import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
    console.log('Activities API Endpoint:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Activities fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const activitiesData = data.results || data;
        setActivities(Array.isArray(activitiesData) ? activitiesData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching activities:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading activities...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">⚠️ Error Loading Activities</h4>
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
        <h2>🏃 Activities</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <span>➕</span> Add Activity
        </button>
      </div>

      {activities.length === 0 ? (
        <div className="empty-state card">
          <div className="card-body text-center py-5">
            <div className="empty-state-icon">📋</div>
            <h4>No Activities Found</h4>
            <p className="text-muted">Start tracking your fitness journey by adding your first activity!</p>
            <button className="btn btn-primary mt-3" onClick={() => setShowModal(true)}>Add Your First Activity</button>
          </div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-striped align-middle">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Date</th>
                <th scope="col" className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity.id}>
                  <th scope="row">{activity.id}</th>
                  <td><strong>{activity.name || 'N/A'}</strong></td>
                  <td>{activity.description || 'No description'}</td>
                  <td>
                    <span className="badge bg-info">{activity.date || 'N/A'}</span>
                  </td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-outline-primary me-2">View</button>
                    <button className="btn btn-sm btn-outline-secondary">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activities.length > 0 && (
        <div className="mt-3 text-muted">
          <small>Total Activities: <strong>{activities.length}</strong></small>
        </div>
      )}

      {/* Add Activity Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Activity</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="activityName" className="form-label">Activity Name</label>
                    <input type="text" className="form-control" id="activityName" placeholder="e.g., Morning Run" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="activityDescription" className="form-label">Description</label>
                    <textarea className="form-control" id="activityDescription" rows="3" placeholder="Describe your activity..."></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="activityDate" className="form-label">Date</label>
                    <input type="date" className="form-control" id="activityDate" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="activityDuration" className="form-label">Duration (minutes)</label>
                    <input type="number" className="form-control" id="activityDuration" placeholder="30" />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="button" className="btn btn-primary">Save Activity</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Activities;
