// src/pages/Exercises.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { token } = useAuth();

  const fetchExercises = async () => {
    const res = await fetch("http://localhost:5555/exercises");
    const data = await res.json();
    setExercises(data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("http://localhost:5555/exercises", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Failed to add exercise");
    } else {
      setName("");
      fetchExercises();
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Exercises</h2>
      <form onSubmit={handleAdd} className="mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="New exercise name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button className="btn btn-primary">Add</button>
        </div>
        {error && <div className="text-danger mt-2">{error}</div>}
      </form>
      <ul className="list-group">
        {exercises.map((e) => (
          <li key={e.id} className="list-group-item">
            {e.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Exercises;
