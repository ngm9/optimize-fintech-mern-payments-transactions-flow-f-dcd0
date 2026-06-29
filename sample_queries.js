// Sample queries and API calls for the fintech MERN application
// These are intended for manual testing and to help you understand expected behaviors.

// 1. Example MongoDB queries (run inside mongosh)
// ------------------------------------------------
//   use fintech
//   db.accounts.findOne()
//   db.payments.find({ accountId: ObjectId("<someAccountId>") }).limit(5)
//   db.transfers.find({ accountId: ObjectId("<someAccountId>") }).limit(5)
//   db.payments.find({ merchantName: /Merchant 1/ }).limit(5)
//   db.payments.explain("executionStats").find({ accountId: ObjectId("<someAccountId>") }).sort({ createdAt: -1 }).limit(20)
//   db.transfers.explain("executionStats").find({ accountId: ObjectId("<someAccountId>") }).sort({ createdAt: -1 }).limit(20)

// 2. Example API calls using curl
// --------------------------------
// Health check:
//   curl http://localhost:5000/health
//
// Get an example account summary (replace <ACCOUNT_ID>):
//   curl http://localhost:5000/api/v1/accounts/<ACCOUNT_ID>/summary
//
// Get paginated transactions for an account:
//   curl "http://localhost:5000/api/v1/accounts/<ACCOUNT_ID>/transactions?page=1&limit=20"
//
// List most recent payments across all accounts:
//   curl "http://localhost:5000/api/v1/payments?limit=10"
//
// Process a new payment (replace IDs with valid values):
//   curl -X POST http://localhost:5000/api/v1/payments/process \
//     -H "Content-Type: application/json" \
//     -d '{
//       "userId": "<USER_ID>",
//       "accountId": "<ACCOUNT_ID>",
//       "amount": 25.50,
//       "currency": "USD",
//       "method": "CARD"
//     }'

// Note: The current implementation is intentionally not optimal for large datasets.
// You are expected to refine query patterns, indexing, and API behavior for better performance.
