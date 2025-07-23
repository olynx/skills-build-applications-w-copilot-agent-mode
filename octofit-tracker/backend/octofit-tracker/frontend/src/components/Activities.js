import React, { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';

const API_URL = window.location.hostname.includes('github.dev')
  ? 'https://curly-space-disco-wxvjvvpxw94hgp9j-8000.app.github.dev/api/activities/?codespace=1'
  : 'http://127.0.0.1:8000/api/activities/';

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        // Handle paginated or object response
        if (Array.isArray(data)) {
          setActivities(data);
        } else if (Array.isArray(data.results)) {
          setActivities(data.results);
        } else if (typeof data === 'object') {
          // Try to find the first array in the object
          const arr = Object.values(data).find(v => Array.isArray(v));
          setActivities(arr || []);
        } else {
          setActivities([]);
        }
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, []);

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title as="h2" className="mb-4">Activities</Card.Title>
        <Table striped bordered hover responsive>
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Activity Type</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(activities) && activities.map((activity, idx) => (
              <tr key={activity.id}>
                <td>{idx + 1}</td>
                <td>{activity.activity_type || ''}</td>
                <td>{activity.duration || ''}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default Activities;
