// MongoDB initialization script for fintech app
// This script is executed automatically by the MongoDB container on first startup.

// Switch to fintech database
var dbName = 'fintech';
var db = db.getSiblingDB(dbName);

// Create application user (authentication is not enforced by default connection, but user exists)
db.createUser({
  user: 'fintech_app',
  pwd: 'fintech_pass',
  roles: [{ role: 'readWrite', db: dbName }]
});

// USERS collection: represents platform users
if (!db.getCollectionNames().includes('users')) {
  db.createCollection('users');
}

db.users.createIndex({ email: 1 }, { unique: true });

// ACCOUNTS collection: each user can have multiple accounts (e.g., wallet accounts)
if (!db.getCollectionNames().includes('accounts')) {
  db.createCollection('accounts');
}

db.accounts.createIndex({ userId: 1 });
db.accounts.createIndex({ accountNumber: 1 }, { unique: true });

// PAYMENTS collection: outgoing payments initiated by users
if (!db.getCollectionNames().includes('payments')) {
  db.createCollection('payments');
}

// Basic index; additional optimization may be required in the task
db.payments.createIndex({ accountId: 1, createdAt: -1 });

// TRANSFERS collection: internal transfers between accounts
if (!db.getCollectionNames().includes('transfers')) {
  db.createCollection('transfers');
}

db.transfers.createIndex({ accountId: 1, createdAt: -1 });

// MERCHANTS collection: stores information about payment merchants
if (!db.getCollectionNames().includes('merchants')) {
  db.createCollection('merchants');
}

db.merchants.createIndex({ name: 1 });

// CURRENCIES collection: supported currencies and metadata
if (!db.getCollectionNames().includes('currencies')) {
  db.createCollection('currencies');
}

db.currencies.createIndex({ code: 1 }, { unique: true });

// Seed currencies
var currencies = [
  { code: 'USD', name: 'US Dollar', decimals: 2 },
  { code: 'EUR', name: 'Euro', decimals: 2 },
  { code: 'INR', name: 'Indian Rupee', decimals: 2 }
];

db.currencies.insertMany(currencies);

// Seed merchants
var merchants = [];
for (var i = 1; i <= 50; i++) {
  merchants.push({
    name: 'Merchant ' + i,
    category: i % 2 === 0 ? 'Retail' : 'Services',
    active: true
  });
}

db.merchants.insertMany(merchants);

// Seed users and accounts
var userCount = 200;
var accounts = [];
var users = [];

for (var u = 1; u <= userCount; u++) {
  var userId = ObjectId();
  users.push({
    _id: userId,
    name: 'User ' + u,
    email: 'user' + u + '@example.com',
    createdAt: new Date()
  });

  var accountId = ObjectId();
  accounts.push({
    _id: accountId,
    userId: userId,
    accountNumber: 'ACC' + (100000 + u),
    currency: 'USD',
    balance: Math.floor(Math.random() * 100000) / 100,
    createdAt: new Date()
  });
}

db.users.insertMany(users);
db.accounts.insertMany(accounts);

// Seed payments and transfers with realistic volumes
var payments = [];
var transfers = [];

// Choose a subset of accounts for heavier activity
var hotAccountIds = accounts.slice(0, 50).map(function (a) { return a._id; });

for (var i = 0; i < 50000; i++) {
  var accountIndex = Math.floor(Math.random() * accounts.length);
  var account = accounts[accountIndex];
  var merchant = merchants[Math.floor(Math.random() * merchants.length)];
  var amount = Math.floor(Math.random() * 50000) / 100;
  var createdAt = new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000);

  payments.push({
    accountId: account._id,
    userId: account.userId,
    merchantName: merchant.name,
    currency: 'USD',
    amount: amount,
    method: Math.random() > 0.5 ? 'CARD' : 'WALLET',
    status: 'SUCCESS',
    createdAt: createdAt
  });
}

for (var t = 0; t < 30000; t++) {
  var fromIndex = Math.floor(Math.random() * hotAccountIds.length);
  var toIndex = Math.floor(Math.random() * accounts.length);
  var fromAccountId = hotAccountIds[fromIndex];
  var toAccountId = accounts[toIndex]._id;
  var tAmount = Math.floor(Math.random() * 20000) / 100;
  var tCreatedAt = new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000);

  transfers.push({
    accountId: fromAccountId,
    toAccountId: toAccountId,
    amount: tAmount,
    currency: 'USD',
    createdAt: tCreatedAt
  });
}

if (payments.length > 0) {
  db.payments.insertMany(payments);
}
if (transfers.length > 0) {
  db.transfers.insertMany(transfers);
}

// Additional simple text index for merchantName to enable search
try {
  db.payments.createIndex({ merchantName: "text" });
} catch (e) {}

// Note: this data model and indexing strategy are intentionally not fully optimized.
// The task expects further improvements via query design, aggregation pipelines, and additional indexes.
