// Import Config
import {config} from 'dotenv';

// Setup Config
config();

// Back to Imports
import Router from 'express';
import swaggerUi from 'swagger-ui-express';
const swaggerPath = `../${process.env.SWAGGER_JSON_FILENAME}`;
const swaggerDoc = require(swaggerPath);

import {homieRouter} from "./homie";
import {hangoutRouter} from "./hangout";
import {decisionRouter} from "./decision";
import {auth, requiresAuth} from "express-openid-connect";
import {addHomieId} from "../middleware/auth";

export const routes = Router();

// Swaggggg
routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDoc));

// Auth0 config -- AFTER API DOCS so that those routes aren't protected
const authConfig = {
  // authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: 'https://dev-1ov54mn68ykqs730.us.auth0.com'
};
routes.use(auth(authConfig));
routes.use(addHomieId);

// Base
routes.get('/', (req, res) => {
  res.json({
    loggedIn: req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out',
    user: req.oidc.user
  });
});
routes.get('/profile', requiresAuth(), async (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

// Entities
routes.use('/homie', homieRouter);
routes.use('/hangout', hangoutRouter);
routes.use('/hangout', decisionRouter);
