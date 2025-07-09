import { useEffect, useState } from 'react';
import API from '../api/api';
import { Link } from 'react-router-dom';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    API.get('/workouts').then(res => setWorkouts(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <h3>Your Workouts</h3>
      <Link to="/workouts/new" className="btn btn-primary mb-3">+ New Workout</Link>
      <ul className="list-group">
        {workouts.map(w => (
          <li key={w.id} className="list-group-item">
            Workout on {w.date}
          </li>
        ))}
      </ul>
    </div>
  );
}
