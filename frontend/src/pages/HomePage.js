import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [accountId, setAccountId] = useState('');
  const navigate = useNavigate();

  const goToAccount = (e) => {
    e.preventDefault();
    if (accountId) {
      navigate(`/accounts/${accountId}`);
    }
  };

  return (
    <div>
      <h1>Fintech Dashboard</h1>
      <p>Enter an accountId to view its summary and recent transactions.</p>
      <form onSubmit={goToAccount}>
        <input
          type="text"
          placeholder="Account ID"
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          style={{ width: '300px' }}
        />
        <button type="submit" style={{ marginLeft: '0.5rem' }}>
          View Account
        </button>
      </form>
    </div>
  );
}

export default HomePage;
