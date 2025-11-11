import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
    console.log('Teams API Endpoint:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Teams fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || data;
        setTeams(Array.isArray(teamsData) ? teamsData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching teams:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading teams...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">⚠️ Error Loading Teams</h4>
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
        <h2>👥 Teams</h2>
        <button className="btn btn-success" onClick={() => setShowModal(true)}>
          <span>➕</span> Create Team
        </button>
      </div>

      {teams.length === 0 ? (
        <div className="empty-state card">
          <div className="card-body text-center py-5">
            <div className="empty-state-icon">🏅</div>
            <h4>No Teams Found</h4>
            <p className="text-muted">Create a team and start competing together!</p>
            <button className="btn btn-success mt-3" onClick={() => setShowModal(true)}>Create Your First Team</button>
          </div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-striped align-middle">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Team Name</th>
                <th scope="col">Description</th>
                <th scope="col" className="text-center">Members</th>
                <th scope="col" className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.id}>
                  <th scope="row">{team.id}</th>
                  <td><strong>{team.name || 'N/A'}</strong></td>
                  <td>{team.description || 'No description'}</td>
                  <td className="text-center">
                    <span className="badge bg-success rounded-pill">
                      {team.members ? team.members.length : 0} members
                    </span>
                  </td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-outline-success me-2">View</button>
                    <button className="btn btn-sm btn-outline-secondary">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {teams.length > 0 && (
        <div className="mt-3 text-muted">
          <small>Total Teams: <strong>{teams.length}</strong></small>
        </div>
      )}

      {/* Create Team Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create New Team</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="teamName" className="form-label">Team Name</label>
                    <input type="text" className="form-control" id="teamName" placeholder="e.g., Thunder Squad" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="teamDescription" className="form-label">Description</label>
                    <textarea className="form-control" id="teamDescription" rows="3" placeholder="Describe your team..."></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="teamGoal" className="form-label">Team Goal</label>
                    <input type="text" className="form-control" id="teamGoal" placeholder="e.g., Run 100km this month" />
                  </div>
                  <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="publicTeam" />
                    <label className="form-check-label" htmlFor="publicTeam">
                      Make this team public (others can join)
                    </label>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="button" className="btn btn-success">Create Team</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Teams;
