import React, { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';

const API_URL = window.location.hostname.includes('github.dev')
  ? 'https://curly-space-disco-wxvjvvpxw94hgp9j-8000.app.github.dev/api/teams/?codespace=1'
  : 'http://127.0.0.1:8000/api/teams/';

function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setTeams(data))
      .catch(err => console.error('Error fetching teams:', err));
  }, []);

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title as="h2" className="mb-4">Teams</Card.Title>
        <Table striped bordered hover responsive>
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(teams) && teams.map((team, idx) => (
              <tr key={team.id}>
                <td>{idx + 1}</td>
                <td>{team.name}</td>
                <td>{team.description || ''}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default Teams;
