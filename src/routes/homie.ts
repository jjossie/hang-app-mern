import {createHomie, getHomieById, readyUpHomie, updateHomie} from "../controllers/homie";
import Router from 'express';
import {IHomie} from "../models/homie";
import {requiresAuth} from "express-openid-connect";

export const homieRouter = Router();


homieRouter.post('/', requiresAuth(), async (req, res) => {
  /*  #swagger.parameters['homie'] = {
        in: 'body',
        description: 'Creating a new homie. This (for now) will not add them to a hangout',
        schema: { $ref: '#/definitions/newHomie' }
  } */
  try {
    const newHomie: IHomie = req.body;
    if (!req.oidc.user)
      return res.status(403).json({message: "needs auth, there was no user obj"});
    try {
      const result = await createHomie(newHomie.name, req.oidc.user);
      return res.status(201).json(result);
    } catch (e) {
      return res.status(409).json({message: "Homie already exists with that email"});
    }
  } catch (e) {
    return res.status(400).json({
      message: "Failed to create homie",
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

homieRouter.put('/', requiresAuth(), async (req, res) => {
  /*  #swagger.parameters['homie'] = {
        in: 'body',
        description: 'Editing an existing homie. This (for now) will not add them to a hangout',
        schema: { $ref: '#/definitions/homie' }
      }
      #swagger.responses[204] = {
        description: 'Successfully edited the homie'
      }
      #swagger.responses[401] = {
        description: 'Not logged in'
  } */
  try {
    const updatedHomie: IHomie = req.body;
    const result = await updateHomie(req.homieId, updatedHomie);
    console.log(result);
    res.status(204).json(result);
  } catch (e) {
    res.status(400).json({
      message: "Updating homie failed",
      error: e,
    });
  }
});

homieRouter.put('/readyUp', requiresAuth(), async (req, res) => {
  /*  #swagger.responses[204] = {
      description: 'Ready up a single homie. Sets their isReady status to true',
} */
  try {
    const result = await readyUpHomie(req.homieId);
    console.log(result);
    return res.status(204).json(result);
  } catch (e) {
    return res.status(400).json({
      message: "Couldn't ready up da homie",
      error: e,
    });
  }
});