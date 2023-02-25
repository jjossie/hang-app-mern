import Router from 'express';
import {IDecision, IOption, IVote} from "../models/hangout";
import {addDecisionToHangout, addOptionToHangout, voteOnOption} from "../controllers/decision";
import {requiresAuth} from "express-openid-connect";

export const decisionRouter = Router();


decisionRouter.put("/:hangoutId/addDecision", requiresAuth(), async (req, res) => {
  // TODO Swag this thang up
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
  // TODO Swag this thang up
  try {
    const option: IOption = req.body;
    const hangoutId = req.params.hangoutId;
    const result = await addOptionToHangout(hangoutId, option);
    return res.json(result);
  } catch (e) {
    return res.status(400).json({message: "Failed to add Decision", error: e});
  }
});


decisionRouter.put("/:hangoutId/vote", requiresAuth(), async (req, res) => {
  // TODO get swaggy
  try {
    const hangoutId = req.params.hangoutId;
    // const {vote: IVote, option: IOption} = req.body;
    const vote: IVote = req.body.vote;
    const option: IOption = req.body.option;
    const result = await voteOnOption(vote, option, hangoutId);
    return res.status(201).json(result);
  } catch (e) {
    return res.status(400).json({message: "Failed to vote on Option", error: e});
  }

});