import React from 'react';

function TransactionsTable({ items }) {
  return (
    <table border="1" cellPadding="4" cellSpacing="0" width="100%">
      <thead>
        <tr>
          <th>ID</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Currency</th>
          <th>Status</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {items.map((tx) => (
          <tr key={tx._id}>
            <td>{tx._id}</td>
            <td>{tx.type}</td>
            <td>{tx.amount}</td>
            <td>{tx.currency}</td>
            <td>{tx.status}</td>
            <td>{new Date(tx.createdAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TransactionsTable;
