import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useAuth } from '../auth/AuthContext';

export default function NewWorkoutPage() {
  const [date, setDate] = useState('');
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://127.0.0.1:5555/workouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ date })
    });

    if (res.ok) {
      const data = await res.json();
      navigate('/workouts');
    } else {
      alert('Error creating workout');
    }
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <h3>Create New Workout</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">Create</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
