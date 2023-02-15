import {createHomie, getHomieById, readyUpHomie, updateHomie} from "../controllers/homie";
import Router from 'express';
import {Homie} from "../models/homie";
import {requiresAuth} from "express-openid-connect";

export const homieRouter = Router();


homieRouter.post('/', async (req, res) => {
  /*  #swagger.parameters['homie'] = {
        in: 'body',
        description: 'Creating a new homie. This (for now) will not add them to a hangout',
        schema: { $ref: '#/definitions/homie' }
  } */
  try {
    const newHomie: Homie = req.body;
    const result = await createHomie(newHomie.name, newHomie.email);
    console.log(result);
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({
      message: "Invalid homie",
      error: e,
    });
  }
});


homieRouter.get('/:homieId', async (req, res) => {
  /* #swagger.responses[200] = {
       description: 'Get a homie by ID',
       schema: { $ref: '#/definitions/homie' }
   } */
  try {
    const homieId = req.params.homieId;
    const result = await getHomieById(homieId);
    res.status(200).json(result);
  } catch (e) {
    res.status(404).json({
      message: "Homie not found. check the id maybe idk",
      error: e,
    });
  }
});

homieRouter.put('/:homieId', requiresAuth(), async (req, res) => {
  /*  #swagger.parameters['homie'] = {
      in: 'body',
      description: 'Editing an existing homie. This (for now) will not add them to a hangout',
      schema: { $ref: '#/definitions/homie' }
      }
      #swagger.responses[204] = {
      description: 'Successfully edited the homie'
  } */
  try {
    const homieId = req.params.homieId;
    const updatedHomie: Homie = req.body;
    const result = await updateHomie(homieId, updatedHomie);
    console.log(result);
    res.status(204).json(result);
  } catch (e) {
    res.status(400).json({
      message: "Updating homie failed",
      error: e,
    });
  }
});

homieRouter.put('/:homieId/readyUp', requiresAuth(), async (req, res) => {
  /*  #swagger.responses[204] = {
      description: 'Ready up a single homie. Sets their isReady status to true',
} */
  try {
    const homieId = req.params.homieId;
    const result = await readyUpHomie(homieId);
    console.log(result);
    res.status(204).json(result);
  } catch (e) {
    res.status(400).json({
      message: "Couldn't ready up da homie",
      error: e,
    });
  }
});