import { useState } from 'react';
import API from '../api';

export default function AddWorkout({ onAdd }) {
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post('/workouts', { date });
    onAdd(res.data);
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={date} onChange={(e) => setDate(e.target.value)} placeholder="YYYY-MM-DD" required />
      <button type="submit">Add Workout</button>
    </form>
  );
}
