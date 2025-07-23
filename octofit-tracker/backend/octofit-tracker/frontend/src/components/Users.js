// Trigger redeploy: dummy change
import React, { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';

const API_URL = window.location.hostname.includes('github.dev')
  ? 'https://curly-space-disco-wxvjvvpxw94hgp9j-8000.app.github.dev/api/users/?codespace=1'
  : 'http://127.0.0.1:8000/api/users/';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title as="h2" className="mb-4">Users</Card.Title>
        <Table striped bordered hover responsive>
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) && users.map((user, idx) => (
              <tr key={user.id}>
                <td>{idx + 1}</td>
                <td>{user.username}</td>
                <td>{user.email || ''}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default Users;
