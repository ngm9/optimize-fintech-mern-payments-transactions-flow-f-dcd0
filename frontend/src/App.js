import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AccountPage from './pages/AccountPage';

function App() {
  return (
    <Router>
      <div>
        <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
          <Link to="/">Fintech Dashboard</Link>
        </header>
        <main style={{ padding: '1rem' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/accounts/:accountId" element={<AccountPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
