import Router from 'express';
import {createHomie, getHomieById} from "../controllers/hangout";
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from "../swagger.json";

export const routes = Router();
// routes.get('/', (req, res) => {
//   res.send("hello");
// });

// Swaggggg
routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDoc));

// routes.get('/hello', (req, res) => {
//   res.send("Hello World!");
// });


routes.post('/homie', async (req, res) => {
  /*  #swagger.parameters['homie'] = {
        in: 'body',
        description: 'Creating a new homie. This (for now) will not add them to a hangout',
        schema: { $ref: '#/definitions/homie' }
  } */
  try {
    const newHomie = req.body;
    const result = await createHomie(newHomie.name, newHomie.email);
    console.log(result);
    res.status(201).json(result);
  } catch (e) {
    res.status(400).send("Invalid homie");
  }
});


routes.get('/homie/:homieId', async (req, res) => {
  /* #swagger.responses[200] = {
     description: 'Get a homie by ID',
     schema: { $ref: '#/definitions/homie' }
 } */
  try {
    const homieId = req.params.homieId;
    const result = await getHomieById(homieId);
    res.status(200).json(result);
  } catch (e) {
    res.status(404).send("Homie not found. check the id maybe idk");
  }
});

