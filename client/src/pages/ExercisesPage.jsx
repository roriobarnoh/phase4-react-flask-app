// src/pages/ExercisesPage.jsx
import { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { Container, Form, Button, Table, Alert } from 'react-bootstrap';

export default function ExercisesPage() {
  const { token } = useAuth();
  const [exercises, setExercises] = useState([]);
  const [newExercise, setNewExercise] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetch('/exercises')
      .then((res) => res.json())
      .then(setExercises)
      .catch((err) => setError('Failed to fetch exercises'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const res = await fetch('/exercises', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: newExercise }),
    });

    const data = await res.json();

    if (res.ok) {
      setExercises([...exercises, { id: data.id, name: newExercise }]);
      setNewExercise('');
      setSuccess('Exercise created');
    } else {
      setError(data.error || 'Failed to add exercise');
    }
  };

  return (
    <Container className="mt-4">
      <h2>Exercises</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit} className="mb-3">
        <Form.Group controlId="newExercise">
          <Form.Label>New Exercise</Form.Label>
          <Form.Control
            type="text"
            value={newExercise}
            onChange={(e) => setNewExercise(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" className="mt-2">Add Exercise</Button>
      </Form>

      <h4>Exercise List</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((e, i) => (
            <tr key={e.id}>
              <td>{i + 1}</td>
              <td>{e.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
