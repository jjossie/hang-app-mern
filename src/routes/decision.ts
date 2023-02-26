import Router from 'express';
import {IDecision, IOption, IOptionInput, IVote} from "../models/hangout";
import {addDecisionToHangout, addOptionToHangout, voteOnOption} from "../controllers/decision";
import {requiresAuth} from "express-openid-connect";

export const decisionRouter = Router();


decisionRouter.put("/:hangoutId/addDecision", requiresAuth(), async (req, res) => {
  /*
  #swagger.parameters['hangoutId'] = {
    in: 'path',
    description: 'ID of the hangout to get',
    schema: '63face4b17334f46d9b59ad7'
  }
  #swagger.parameters['decision'] = {
    in: 'body',
    description: 'Decision to add',
    schema: { $ref: '#/definitions/newDecision' }
  }
  #swagger.responses[200] = {
     description: 'Decision added to hangout',
     schema:  { $ref: '#/definitions/hangout' }
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
    const decision: IDecision = req.body;
    const hangoutId = req.params.hangoutId;
    const result = await addDecisionToHangout(hangoutId, decision);
    return res.json(result);
  } catch (e) {
    return res.status(400).json({message: "Failed to add Decision", error: e});
  }

});

decisionRouter.put("/:hangoutId/addOption", requiresAuth(), async (req, res) => {
  /*
  #swagger.parameters['hangoutId'] = {
    in: 'path',
    description: 'ID of the hangout to add an option to',
    schema: '63face4b17334f46d9b59ad7'
  }
  #swagger.parameters['option'] = {
    in: 'body',
    description: 'Option to add',
    schema: { $ref: '#/definitions/newOption' }
  }
  #swagger.responses[200] = {
     description: 'Option added to hangout',
     schema:  { $ref: '#/definitions/hangout' }
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
    const optionInput: IOptionInput = req.body;
    const hangoutId = req.params.hangoutId;
    const newOption: IOption = {
      text: optionInput.text,
      author: req.homieId,
      votes: []
    }
    const result = await addOptionToHangout(hangoutId, newOption);
    return res.json(result);
  } catch (e) {
    return res.status(400).json({message: "Failed to add Decision", error: e});
  }
});


decisionRouter.put("/:hangoutId/vote/:optionId", requiresAuth(), async (req, res) => {
  /*
  #swagger.parameters['hangoutId'] = {
    in: 'path',
    description: 'ID of the hangout to vote in',
    schema: '63face4b17334f46d9b59ad7'
  }
  #swagger.parameters['optionId'] = {
    in: 'path',
    description: 'ID of option to vote on',
    schema: '63fad375e256e291ae4d0245'
  }
  #swagger.parameters['vote'] = {
    in: 'body',
    description: 'Details of the vote. Value should be -1, 0, or 1 for no, neutral, or yes, respectively. timeTaken is in seconds.',
    schema: { $ref: '#/definitions/voteInput' }
  }
  #swagger.responses[204] = {
    description: 'Voted successfully',
  }
  #swagger.responses[404] = {
    description: 'Could not find something - wrong ID possibly',
    schema: { $ref: '#/definitions/error' }
  }
  #swagger.responses[400] = {
    description: 'Something else went wrong',
    schema: { $ref: '#/definitions/error' }
  }
  */
  try {
    const hangoutId = req.params.hangoutId;
    const optionId = req.params.optionId;
    const vote: IVote = {
      ...req.body,
      homie: req.homieId
    };
    const result = await voteOnOption(vote, optionId, hangoutId);
    return res.status(201).json(result);
  } catch (e) {
    return res.status(400).json({message: "Failed to vote on Option", error: e});
  }

});