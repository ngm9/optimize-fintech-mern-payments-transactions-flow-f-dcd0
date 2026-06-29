import React from 'react';
import { useParams } from 'react-router-dom';
import AccountSummary from '../components/AccountSummary';

function AccountPage() {
  const { accountId } = useParams();

  return (
    <div>
      <h1>Account Details</h1>
      <AccountSummary accountId={accountId} />
    </div>
  );
}

export default AccountPage;
