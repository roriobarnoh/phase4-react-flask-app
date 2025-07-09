import { useState } from 'react';
import API from '../api/api';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      login(res.data.token);
      navigate('/workouts');
    } catch {
      alert('Login failed');
    }
  };

  return (
    <div className="container mt-5 col-md-6">
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <input name="username" className="form-control mb-2" onChange={handleChange} required />
        <input name="password" type="password" className="form-control mb-2" onChange={handleChange} required />
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}
