import React, { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';

const API_URL = window.location.hostname.includes('github.dev')
  ? 'https://curly-space-disco-wxvjvvpxw94hgp9j-8000.app.github.dev/api/leaderboard/?codespace=1'
  : 'http://127.0.0.1:8000/api/leaderboard/';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setLeaderboard(data))
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, []);

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title as="h2" className="mb-4">Leaderboard</Card.Title>
        <Table striped bordered hover responsive>
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(leaderboard) && leaderboard.map((entry, idx) => (
              <tr key={entry.id}>
                <td>{idx + 1}</td>
                <td>{entry.name}</td>
                <td>{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default Leaderboard;
