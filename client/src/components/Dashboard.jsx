import { useEffect, useState } from 'react';
import API from '../api';
import AddWorkout from './AddWorkout';
import ExerciseLogForm from './ExerciseLogForm';
import { logout } from '../utils';

export default function Dashboard() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    API.get('/workouts').then(res => setWorkouts(res.data));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={logout}>Logout</button>
      <AddWorkout onAdd={w => setWorkouts([...workouts, w])} />
      <ul>
        {workouts.map(w => (
          <li key={w.id}>{w.date} <ExerciseLogForm workoutId={w.id} /></li>
        ))}
      </ul>
    </div>
  );
}