import {Schema, Types, model} from "mongoose";

export interface IVote {
  homie: Types.ObjectId;
  value: -1 | 0 | 1;
  timeTaken: number;
}

export interface IOption {
  text: string;
  score?: number;
  author: Types.ObjectId;
  votes: IVote[];
  _id?: Types.ObjectId;
}

export interface IOptionInput {
  text: string
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

const VoteSchema = new Schema<IVote>({
  homie: {type: Schema.Types.ObjectId, ref: "homie", required: true},
  timeTaken: {type: Number, required: true},
  value: {type: Number, required: true}
});

const OptionSchema = new Schema<IOption>({
  text: {type: String, required: true},
  score: Number,
  author: {type: Schema.Types.ObjectId, ref: "homie", required: true},
  votes: [VoteSchema],
});

const DecisionSchema = new Schema<IDecision>({
  prompt: {type: String, required: true},
  media: String,
  options: [OptionSchema],
});

const HangoutSchema = new Schema<IHangout>({
  creator: {type: Schema.Types.ObjectId, ref: "homie", required: true},
  homies: [{type: Schema.Types.ObjectId,  ref: "homie"}],
  decision: DecisionSchema,
});

export const HangoutModel = model("hangout", HangoutSchema);