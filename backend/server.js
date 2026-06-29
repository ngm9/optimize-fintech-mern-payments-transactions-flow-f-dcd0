const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');

const paymentsRoutes = require('./routes/payments');
const accountsRoutes = require('./routes/accounts');
const healthRoutes = require('./routes/health');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use(compression());
app.use(morgan('dev'));

// Basic health route
app.use('/', healthRoutes);

// Feature routes
app.use('/api/v1/payments', paymentsRoutes);
app.use('/api/v1/accounts', accountsRoutes);

// Error handler
app.use(errorHandler);

const MONGO_URI = 'mongodb://mongo:27017/fintech';

mongoose
  .connect(MONGO_URI, { maxPoolSize: 20 })
  .then(() => {
    console.log('Connected to MongoDB');
    const PORT = 5000;
    app.listen(PORT, () => {
      console.log('Backend listening on port', PORT);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error', err);
    process.exit(1);
  });

module.exports = app;
