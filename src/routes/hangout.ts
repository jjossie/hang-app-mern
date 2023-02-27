import Router from 'express';
import {IHangout} from "../models/hangout";
import {addHomieToHangout, createHangout, getHangoutById, removeHomieFromHangout} from "../controllers/hangout";
import {Request, Response} from "express";

export const hangoutRouter = Router();


hangoutRouter.post('/', async (req: Request, res: Response) => {
  /*
  #swagger.responses[201] = {
    description: 'Created a new hangout',
  }
  */
  try {
    // We could get hangout info from body, but also we have the creator in the request so let's do it ourselves
    // const newHangout: IHangout = req.body;
    const newHangout: IHangout = {
      creator: req.homieId,
    };
    const result = await createHangout(newHangout);
    return res.status(201).json(result);
  } catch (e) {
    return res.status(400).json({
      message: "Failed to create hangout",
      error: e,
    });
  }
});

hangoutRouter.get('/:hangoutId', /*requiresAuth(),*/ async (req: Request, res: Response) => {
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

hangoutRouter.put('/:hangoutId/join', /*requiresAuth(),*/ async (req: Request, res: Response) => {
  /*  #swagger.parameters['hangoutId'] = {
        in: 'path',
        description: 'Hangout to add a homie to',
      }
  */
  try {
    const hangoutId: string = req.params.hangoutId;
    console.log(req.homieId);
    const result = await addHomieToHangout(hangoutId, req.homieId);
    return res.status(204).json(result);
  } catch (e) {
    return res.status(400).json({
      message: "Couldn't add homie to the hangout",
      error: e,
    });
  }
});

hangoutRouter.delete('/:hangoutId/leave', /*requiresAuth(),*/ async (req: Request, res: Response) => {
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
    const result = await removeHomieFromHangout(hangoutId, req.homieId);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(400).json({
      message: "Failed to remove user from hangout",
      error: e,
    });
  }
});