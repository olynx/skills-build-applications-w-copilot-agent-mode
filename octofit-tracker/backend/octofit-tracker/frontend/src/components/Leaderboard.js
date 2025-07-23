// Trigger redeploy: dummy change
import React, { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';

const API_URL = window.location.hostname.includes('github.dev')
  ? 'https://curly-space-disco-wxvjvvpxw94hgp9j-8000.app.github.dev/api/leaderboard/?codespace=1'
  : 'http://127.0.0.1:8000/api/leaderboard/';


function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        // Handle paginated or object response
        if (Array.isArray(data)) {
          setLeaderboard(data);
        } else if (Array.isArray(data.results)) {
          setLeaderboard(data.results);
        } else if (typeof data === 'object') {
          // Try to find the first array in the object
          const arr = Object.values(data).find(v => Array.isArray(v));
          setLeaderboard(arr || []);
        } else {
          setLeaderboard([]);
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Error fetching leaderboard: ' + err.message);
        setLoading(false);
      });
  }, []);

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title as="h2" className="mb-4">Leaderboard</Card.Title>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-danger">{error}</div>
        ) : leaderboard.length === 0 ? (
          <div>No leaderboard entries found.</div>
        ) : (
          <Table striped bordered hover responsive>
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, idx) => {
                let displayName = entry.name || entry.username;
                if (!displayName && entry.user) {
                  if (typeof entry.user === 'object' && entry.user !== null) {
                    displayName = entry.user.username || entry.user.name || 'N/A';
                  } else if (typeof entry.user === 'string') {
                    displayName = entry.user;
                  } else {
                    displayName = 'N/A';
                  }
                }
                // Ensure displayName is never an object
                if (typeof displayName === 'object' || Array.isArray(displayName)) {
                  displayName = 'N/A';
                }
                return (
                  <tr key={entry.id || idx}>
                    <td>{idx + 1}</td>
                    <td>{displayName}</td>
                    <td>{entry.score || entry.points || entry.value || 0}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
}

export default Leaderboard;
