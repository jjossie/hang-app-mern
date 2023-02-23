// Import Config
import {config} from 'dotenv';

// Setup Config
config();

// Back to Imports
import Router from 'express';
import swaggerUi from 'swagger-ui-express';
const swaggerPath = `../${process.env.SWAGGER_JSON_FILENAME}`;
// import swaggerDoc from "../swagger.json";
const swaggerDoc = require(swaggerPath);

import {homieRouter} from "./homie";
import {hangoutRouter} from "./hangout";
import {decisionRouter} from "./decision";
import {requiresAuth} from "express-openid-connect";

export const routes = Router();

// Swaggggg
routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDoc));

// Base
routes.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
routes.get('/profile', requiresAuth(), async (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

// Entities
routes.use('/homie', homieRouter);
routes.use('/hangout', hangoutRouter);
routes.use('/hangout', decisionRouter);
