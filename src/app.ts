// Import necessary modules and dependencies
import express from "express";
import 'dotenv/config'
import { connectToDatabase } from "./config/db";
import tvShowRouter from './routes/tvShowRoutes';
import episodeRouter from './routes/episodeRoutes';
import movieRouter from './routes/movieRoutes';
import authRouter from './routes/authRoutes'
import { authenticateToken } from "./controllers/authController";

// Create an instance of Express.js
const app = express();

// Connect to MongoDB
connectToDatabase();

// Define middleware for parsing JSON data
app.use(express.json());


// Define API endpoints
app.use('/auth/', authRouter)
app.use('/tvshows', authenticateToken, tvShowRouter);
app.use('/tvshows/:id/episodes', authenticateToken, episodeRouter);
app.use('/movies', authenticateToken, movieRouter);


// Start the server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
