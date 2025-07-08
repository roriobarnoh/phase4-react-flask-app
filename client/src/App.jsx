import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { isLoggedIn } from './utils';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  if (!loggedIn) {
    return (
      <div>
        <Login onLogin={() => setLoggedIn(true)} />
        <Register />
      </div>
    );
  }

  return <Dashboard />;
}