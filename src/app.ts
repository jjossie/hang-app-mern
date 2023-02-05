// NPM Modules
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Project Modules
import {routes} from './routes/index.js';

// Config
import {config} from 'dotenv';
config();

// Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/', routes)

// Database

mongoose.connect(process.env.MONGODB_URI).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}`);
    });
}).catch(() => console.log("Failed to connect to database"));
