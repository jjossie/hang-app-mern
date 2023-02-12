import Router from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from "../swagger.json";

import {homieRouter} from "./homie";
import {hangoutRouter} from "./hangout";
import {decisionRouter} from "./decision";

export const routes = Router();

// Swaggggg
routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDoc));

routes.use('/homie', homieRouter);
routes.use('/hangout', hangoutRouter);
routes.use('/decision', decisionRouter);
