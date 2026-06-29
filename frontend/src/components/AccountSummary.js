import React, { useEffect, useState } from 'react';
import { fetchAccountSummary, fetchAccountTransactions } from '../services/api';
import TransactionsTable from './TransactionsTable';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';

// This component intentionally refetches data more often than necessary.
// Part of the task is to improve network behavior and rendering performance.

function AccountSummary({ accountId }) {
  const [summary, setSummary] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const s = await fetchAccountSummary(accountId);
      setSummary(s);
      const t = await fetchAccountTransactions(accountId, page, limit);
      setTransactions(t.items || []);
      setTotal(t.total || 0);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(e.message || 'Failed to load');
    }
  };

  useEffect(() => {
    // Missing dependency optimizations on purpose
    loadData();
  });

  const pageCount = Math.ceil(total / limit) || 1;

  return (
    <div>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {summary && (
        <div style={{ marginBottom: '1rem' }}>
          <h2>Account {summary.accountNumber}</h2>
          <p>
            Balance: {summary.balance} {summary.currency}
          </p>
        </div>
      )}
      <TransactionsTable items={transactions} />
      <div style={{ marginTop: '1rem' }}>
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span style={{ margin: '0 0.5rem' }}>
          Page {page} of {pageCount}
        </span>
        <button disabled={page >= pageCount} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default AccountSummary;
