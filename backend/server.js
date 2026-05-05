const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// Initialize Express App
const app = express();

// Connect to Database
connectDB();

// Essential Security & Logging Middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// API Rate Limiting to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api/', limiter);

// Register API Routes
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/predictor', require('./routes/predictorRoutes'));

// Root Endpoint
app.get('/', (req, res) => {
  res.send('Admission Master API is live and healthy.');
});

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
