exports = {}
// NPM Modules
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { auth } from 'express-openid-connect';

// Project Modules
import {routes} from './routes';

// Import Config
import {config} from 'dotenv';

// Setup Config
config();
const authConfig = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: 'https://dev-1ov54mn68ykqs730.us.auth0.com'
};

// Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(auth(authConfig));

// Routes
app.use('/', routes);


// Database
mongoose.set('strictQuery', true); // Suppress warning
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log(`|***********************************|`);
  console.log(`| Successfully connected to DB!`);
  app.listen(process.env.PORT, () => {
    console.log(`| HangApp listening on port ${process.env.PORT}`);
    console.log(`|***********************************|\n`);
  });
}).catch(() => console.log("Failed to connect to database"));
