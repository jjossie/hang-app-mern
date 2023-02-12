import mongoose, {model} from "mongoose";

import ObjectId = mongoose.Schema.Types.ObjectId;

export interface Vote {
  homie: string;
  timeTaken: number;
}

export interface Option {
  text: string;
  score: number;
  author: string;
  votes: [Vote];
}

export interface Decision {
  prompt: string;
  media?: string;
  options?: [Option];
}

export interface Hangout {
  creator: string;
  homies?: [string];
  decision?: [Decision];
}


const HangoutSchema = new mongoose.Schema({
  creator: {type: ObjectId, required: true},
  homies: [ObjectId],
  decision: [{
    prompt: {type: String, required: true},
    media: String,
    options: [{
      text: {type: String, required: true},
      score: Number,
      author: {type: ObjectId, required: true},
      votes: [{
        homie: {type: ObjectId, required: true},
        timeTaken: Number,
      }],
    }],
  }],
});

export const HangoutModel = model("hangout", HangoutSchema);