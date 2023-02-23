import {IDecision, HangoutModel, IOption, IVote} from "../models/hangout";

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
  if (!hangout)          throw new Error("Hangout not found");
  if (!hangout.decision) throw new Error("No decision attached to hangout");

  if (hangout.decision.options)
    hangout.decision.options.push(option);
  else
    hangout.decision.options = [option];

  return hangout.save();
}

export async function voteOnOption(vote: IVote, option: IOption, hangoutId: string): Promise<object> {
  // TODO figure out the move here. Do we need to be adding unique IDs to Options? do we do a search by option text?
  // TODO there's ambiguity here. maybe the MongoDB webinar will help, idk. How am I supposed to look things up?
  // TODO I never thought relational would make so much more sense than NoSQL bruh

  // perhaps the route we take is we add not an option to an ID, but edit the whole object on the frontend?
  // I kinda hate that though, cause it's doing business logic where it ought not to.
  const hangout = await HangoutModel.findById(hangoutId);
  if (!hangout)                  throw new Error("Hangout not found");
  if (!hangout.decision)         throw new Error("No decision attached to hangout");
  if (!hangout.decision.options) throw new Error("No options to vote on");

  const dbOption = hangout.decision.options.filter(item => item.text == option.text)[0];
  if (!dbOption.votes.includes(vote))
    dbOption.votes.push(vote);
  else
    throw new Error("Cannot vote twice on the same option");

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

export async function getOptionRanking(hangoutId: string) {
  const hangout = await HangoutModel.findById(hangoutId);
  if (!hangout)                  throw new Error("Hangout not found");
  if (!hangout.decision)         throw new Error("No decision attached to hangout");
  if (!hangout.decision.options) throw new Error("No options to vote on");

  hangout.decision.options.sort(compareOptionsByScore);
  return hangout.save();
}

function getScore(option: IOption): number{
  let scores: number[] = [];
  option.votes.forEach(vote => {
    const biasFactor = (vote.homie === option.author) ? AUTHOR_BIAS_FACTOR : 1.0;
    scores.push(biasFactor * (MAX_TIME_TAKEN_MILLIS - vote.timeTaken) )
  })
  if (scores.length === 0) throw new Error("No votes taken yet on option")
  return scores.reduce((prev, curr) => prev + curr, 0) / scores.length;
}