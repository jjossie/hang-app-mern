import Router from 'express';
import {IHangout} from "../models/hangout";
import {addHomieToHangout, createHangout, getHangoutById, removeHomieFromHangout} from "../controllers/hangout";
import {requiresAuth} from "express-openid-connect";

export const hangoutRouter = Router();


hangoutRouter.post('/', async (req, res) => {
  /*
  #swagger.parameters['homie'] = {
    in: 'body',
    description: 'Creating a new hangout',
    schema: { $ref: '#/definitions/newHangout' }
  }
  */
  try {
    const newHangout: IHangout = req.body;
    const result = await createHangout(newHangout);
    console.log(result);
    return res.status(201).json(result);
  } catch (e) {
    return res.status(400).json({
      message: "Failed to create hangout",
      error: e,
    });
  }
});

hangoutRouter.get('/:hangoutId', requiresAuth(), async (req, res) => {
  /*
  #swagger.parameters['hangoutId'] = {
    in: 'path',
    description: 'ID of the hangout to get',
    schema: '63e88b9404d2c96769002296'
  }
  #swagger.responses[200] = {
     description: 'Found Hangout by ID',
     schema: { $ref: '#/definitions/hangout' }
  }
  #swagger.responses[404] = {
     description: 'Could not find hangout - wrong ID',
     schema: { $ref: '#/definitions/error' }
  }
  #swagger.responses[400] = {
     description: 'Something else went wrong',
     schema: { $ref: '#/definitions/error' }
  }
  */
  try {
    const hangoutId = req.params.hangoutId;
    const result = await getHangoutById(hangoutId);
    if (!result)
      return res.status(404).json({message: "Hangout not found"});
    return res.status(200).json(result);
  } catch (e) {
    return res.status(400).json({
      message: "Error getting hangout",
      error: e,
    });
  }
});

hangoutRouter.put('/:hangoutId/addHomie/:homieId', requiresAuth(), async (req, res) => {
  /*  #swagger.parameters['hangoutId'] = {
        in: 'path',
        description: 'Hangout to add a homie to',
      }
      #swagger.parameters['homieId'] = {
        in: 'path',
        description: 'The ID of the homie to add',
      }
  */
  try {
    const hangoutId: string = req.params.hangoutId;
    const homieId: string = req.params.homieId;
    const result = await addHomieToHangout(hangoutId, homieId);
    return res.status(204).json(result);
  } catch (e) {
    return res.status(400).json({
      message: "Couldn't add homie to the hangout",
      error: e,
    });
  }
});

hangoutRouter.delete('/:hangoutId/removeHomie/:homieId', requiresAuth(), async (req, res) => {
  /*
  #swagger.responses[200] = {
    description: 'Successfully removed user from hangout',
  }
  #swagger.responses[400] = {
    description: 'Failed to remove user from hangout',
  }
  */
  try {
    const hangoutId: string = req.params.hangoutId;
    const homieId: string = req.params.homieId;
    const result = await removeHomieFromHangout(hangoutId, homieId);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(400).json({
      message: "Failed to remove user from hangout",
      error: e,
    });
  }
});