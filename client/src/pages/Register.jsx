import { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      navigate('/login');
    } catch {
      alert('Registration failed');
    }
  };

  return (
    <div className="container mt-5 col-md-6">
      <h3>Register</h3>
      <form onSubmit={handleSubmit}>
        <input name="username" className="form-control mb-2" onChange={handleChange} required />
        <input name="password" type="password" className="form-control mb-2" onChange={handleChange} required />
        <button className="btn btn-success">Register</button>
      </form>
    </div>
  );
}
