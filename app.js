import express from 'express';
import connectDB from './db.js';
import dotenv from 'dotenv';
import { globalErrorMiddleware } from './utils/ErrorHandeling.js';

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log(`Unhandeled Exception Shutting down...`);
  process.exit(1);
});

// Defining Express App
const app = express();
dotenv.config();
// Connect DB
connectDB();

app.use(express.json());

// Routes require
import userRoutes from './routes/user.routes.js';

app.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Welcome to Proximus',
  });
});

app.use('/api/user', userRoutes);

app.use(globalErrorMiddleware);

// Starting the server on Port
app.listen(5000, () => {
  console.log(`App is running at port 5000`);
});
