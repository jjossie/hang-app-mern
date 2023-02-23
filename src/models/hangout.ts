import {Schema, Types, model} from "mongoose";

export interface IVote {
  homie: Types.ObjectId;
  timeTaken: number;
}

export interface IOption {
  text: string;
  score?: number;
  author: Types.ObjectId;
  votes: IVote[];
}

export interface IDecision {
  prompt: string;
  media?: string;
  options?: IOption[];
}

export interface IHangout {
  creator: Types.ObjectId;
  homies?: Types.ObjectId[];
  decision?: IDecision;
}

export const VoteSchema = new Schema<IVote>({
  homie: {type: Schema.Types.ObjectId, required: true},
  timeTaken: {type: Number, required: true},
});

export const OptionSchema = new Schema<IOption>({
  text: {type: String, required: true},
  score: Number,
  author: {type: Schema.Types.ObjectId, required: true},
  votes: [VoteSchema],
});

export const DecisionSchema = new Schema<IDecision>({
  prompt: {type: String, required: true},
  media: String,
  options: [OptionSchema],
});

const HangoutSchema = new Schema<IHangout>({
  creator: {type: Schema.Types.ObjectId, required: true},
  homies: [Schema.Types.ObjectId],
  decision: DecisionSchema,
});

export const HangoutModel = model("hangout", HangoutSchema);