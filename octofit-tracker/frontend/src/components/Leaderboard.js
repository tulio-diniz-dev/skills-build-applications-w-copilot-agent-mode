import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
    console.log('Leaderboard API Endpoint:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Leaderboard fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const getRankBadge = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return '🏅';
  };

  const getRankClass = (index) => {
    if (index === 0) return 'table-warning';
    if (index === 1) return 'table-secondary';
    if (index === 2) return 'table-danger';
    return '';
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading leaderboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">⚠️ Error Loading Leaderboard</h4>
          <p>{error}</p>
          <hr />
          <p className="mb-0">Please check your backend connection and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2>🏆 Leaderboard</h2>
        <p className="text-muted">Top performers and their rankings</p>
      </div>

      {leaderboard.length === 0 ? (
        <div className="empty-state card">
          <div className="card-body text-center py-5">
            <div className="empty-state-icon">🏆</div>
            <h4>No Leaderboard Data</h4>
            <p className="text-muted">Complete activities to see your ranking!</p>
          </div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th scope="col" className="text-center" style={{width: '80px'}}>Rank</th>
                <th scope="col">User</th>
                <th scope="col" className="text-center">Score</th>
                <th scope="col">Team</th>
                <th scope="col" className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry.id || index} className={getRankClass(index)}>
                  <td className="text-center">
                    <span style={{fontSize: '1.5rem'}}>{getRankBadge(index)}</span>
                    <div><small className="text-muted">#{index + 1}</small></div>
                  </td>
                  <td>
                    <strong>{entry.user || entry.username || 'N/A'}</strong>
                  </td>
                  <td className="text-center">
                    <span className="badge bg-primary" style={{fontSize: '1rem', padding: '0.5rem 1rem'}}>
                      {entry.score || 0} pts
                    </span>
                  </td>
                  <td>
                    <span className="badge bg-success">{entry.team || 'No Team'}</span>
                  </td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-outline-primary">View Profile</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {leaderboard.length > 0 && (
        <div className="mt-3 text-muted text-center">
          <small>Showing <strong>{leaderboard.length}</strong> participants</small>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
