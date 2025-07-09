import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import AppNavbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Workouts from './pages/Workouts';
import ExercisesPage from './pages/ExercisesPage';
import NewWorkoutPage from './pages/NewWorkoutPage';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppNavbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/workouts" element={<PrivateRoute><Workouts /></PrivateRoute>} />
          <Route path="/exercises" element={<PrivateRoute><ExercisesPage /></PrivateRoute>} />
          <Route
            path="/workouts/new"
            element={<PrivateRoute><NewWorkoutPage /></PrivateRoute>}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
