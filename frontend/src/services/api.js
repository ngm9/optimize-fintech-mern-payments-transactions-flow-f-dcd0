const BASE_URL = 'http://localhost:5000';

// Simple API client without any caching or request deduplication.

export async function fetchAccountSummary(accountId) {
  const res = await fetch(`${BASE_URL}/api/v1/accounts/${accountId}/summary`);
  if (!res.ok) {
    throw new Error('Failed to fetch account summary');
  }
  return res.json();
}

export async function fetchAccountTransactions(accountId, page, limit) {
  const res = await fetch(
    `${BASE_URL}/api/v1/accounts/${accountId}/transactions?page=${page}&limit=${limit}`
  );
  if (!res.ok) {
    throw new Error('Failed to fetch account transactions');
  }
  return res.json();
}

export async function processPayment(payload) {
  const res = await fetch(`${BASE_URL}/api/v1/payments/process`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.message || 'Failed to process payment');
  }
  return res.json();
}
