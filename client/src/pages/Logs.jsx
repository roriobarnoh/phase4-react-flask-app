// src/pages/Logs.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Logs = () => {
  const { token } = useAuth();
  const [logs, setLogs] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [form, setForm] = useState({
    sets: "",
    reps: "",
    weight: "",
    exercise_id: "",
    workout_id: "",
  });
  const [error, setError] = useState("");

  const fetchAll = async () => {
    const headers = { Authorization: `Bearer ${token}` };

    const [logsRes, exercisesRes, workoutsRes] = await Promise.all([
      fetch("http://localhost:5555/exercise-logs", { headers }),
      fetch("http://localhost:5555/exercises"),
      fetch("http://localhost:5555/workouts", { headers }),
    ]);

    setLogs(await logsRes.json());
    setExercises(await exercisesRes.json());
    setWorkouts(await workoutsRes.json());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("http://localhost:5555/exercise-logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Failed to add log");
    } else {
      setForm({ sets: "", reps: "", weight: "", exercise_id: "", workout_id: "" });
      fetchAll();
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Exercise Logs</h2>

      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Sets"
            value={form.sets}
            onChange={(e) => setForm({ ...form, sets: e.target.value })}
            required
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Reps"
            value={form.reps}
            onChange={(e) => setForm({ ...form, reps: e.target.value })}
            required
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Weight"
            value={form.weight}
            onChange={(e) => setForm({ ...form, weight: e.target.value })}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={form.exercise_id}
            onChange={(e) => setForm({ ...form, exercise_id: e.target.value })}
            required
          >
            <option value="">Select Exercise</option>
            {exercises.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={form.workout_id}
            onChange={(e) => setForm({ ...form, workout_id: e.target.value })}
            required
          >
            <option value="">Select Workout</option>
            {workouts.map((w) => (
              <option key={w.id} value={w.id}>
                {w.date}
              </option>
            ))}
          </select>
        </div>
        <div className="col-12">
          <button className="btn btn-success" type="submit">
            Add Log
          </button>
        </div>
        {error && <div className="text-danger">{error}</div>}
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Sets</th>
            <th>Reps</th>
            <th>Weight</th>
            <th>Exercise ID</th>
            <th>Workout ID</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.sets}</td>
              <td>{log.reps}</td>
              <td>{log.weight}</td>
              <td>{log.exercise_id}</td>
              <td>{log.workout_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Logs;
