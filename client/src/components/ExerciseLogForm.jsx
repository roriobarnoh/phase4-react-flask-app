import { useState, useEffect } from 'react';
import API from '../api';

export default function ExerciseLogForm({ workoutId }) {
  const [form, setForm] = useState({ exercise_id: '', sets: '', reps: '', weight: '' });
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    API.get('/exercises').then(res => setExercises(res.data));
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await API.post('/exercise-logs', { ...form, workout_id: workoutId });
    alert('Log saved!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <select name="exercise_id" onChange={handleChange} value={form.exercise_id} required>
        <option value="">Select Exercise</option>
        {exercises.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
      </select>
      <input name="sets" value={form.sets} onChange={handleChange} placeholder="Sets" type="number" required />
      <input name="reps" value={form.reps} onChange={handleChange} placeholder="Reps" type="number" required />
      <input name="weight" value={form.weight} onChange={handleChange} placeholder="Weight" type="number" />
      <button type="submit">Log</button>
    </form>
  );
}
