import React, { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';

const API_URL = window.location.hostname.includes('github.dev')
  ? 'https://curly-space-disco-wxvjvvpxw94hgp9j-8000.app.github.dev/api/workouts/?codespace=1'
  : 'http://127.0.0.1:8000/api/workouts/';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setWorkouts(data))
      .catch(err => console.error('Error fetching workouts:', err));
  }, []);

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title as="h2" className="mb-4">Workouts</Card.Title>
        <Table striped bordered hover responsive>
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(workouts) && workouts.map((workout, idx) => (
              <tr key={workout.id}>
                <td>{idx + 1}</td>
                <td>{workout.name}</td>
                <td>{workout.description || ''}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default Workouts;
