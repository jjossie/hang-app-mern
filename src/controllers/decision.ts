import {IDecision, HangoutModel, IOption, IVote, IHangout} from "../models/hangout";

const AUTHOR_BIAS_FACTOR = 0.8;
const MAX_TIME_TAKEN_MILLIS = 15000;


export async function addDecisionToHangout(hangoutId: string, decision: IDecision): Promise<object> {
  const hangout = await HangoutModel.findById(hangoutId);
  if (!hangout) throw new Error("Hangout not found");

  hangout.decision = decision;
  return hangout.save();
}

export async function addOptionToHangout(hangoutId: string, option: IOption): Promise<object> {
  const hangout = await HangoutModel.findById(hangoutId);
  if (!hangout) throw new Error("Hangout not found");
  if (!hangout.decision) throw new Error("No decision attached to hangout");

  if (hangout.decision.options)
    hangout.decision.options.push(option);
  else
    hangout.decision.options = [option];

  return hangout.save();
}

export async function voteOnOption(vote: IVote, optionId: string, hangoutId: string): Promise<object> {
  const hangout = await HangoutModel.findOne({_id: hangoutId});
  if (!hangout) throw new Error("Hangout not found");
  if (!hangout.decision) throw new Error("No decision attached to hangout");
  if (!hangout.decision.options) throw new Error("No options to vote on");

  const option = hangout.decision.options.find(option => option._id!.toString() === optionId);
  if (!option) throw new Error("No option with that ID found");

  // Fun Fact: ChatGPT wrote this block of code!
  const existingVote = option.votes.find(v => v.homie.toString() === vote.homie.toString());
  if (!existingVote) {
    option.votes.push(vote);
  } else {
    throw new Error("Cannot vote twice on the same option");
  }

  return hangout.save();
}

function compareOptionsByScore(lhs: IOption, rhs: IOption): number {
  if (!lhs.score)
    lhs.score = getScore(lhs);
  if (!rhs.score)
    rhs.score = getScore(rhs);
  if (lhs.score === rhs.score) return 0;
  else return (lhs.score < rhs.score) ? -1 : 1;
}

export async function getOptionRanking(hangoutId: string): Promise<IOption[]> {
  const hangout = await HangoutModel.findById(hangoutId);
  if (!hangout) throw new Error("Hangout not found");
  if (!hangout.decision) throw new Error("No decision attached to hangout");
  if (!hangout.decision.options) throw new Error("No options to vote on");

  // Prevent getting a ranking before everyone has voted
  if (!isVotingFinished(hangout))
    throw new Error("Voting not yet finished");

  hangout.decision.options.sort(compareOptionsByScore);
  await hangout.save();
  return hangout.decision.options;
}

function getScore(option: IOption): number {
  let scores: number[] = [];
  option.votes.forEach(vote => {
    const biasFactor = (vote.homie === option.author) ? AUTHOR_BIAS_FACTOR : 1.0;
    scores.push(biasFactor * (MAX_TIME_TAKEN_MILLIS - vote.timeTaken));
  });
  if (scores.length === 0) throw new Error("No votes taken yet on option");
  return scores.reduce((prev, curr) => prev + curr, 0) / scores.length;
}

function isVotingFinished(hangout: IHangout): boolean {
  hangout.decision!.options!.forEach(option => {
    // This could use some extra assertion
    if (option.votes.length != hangout.homies!.length)
      return false;
  });
  return true;
}