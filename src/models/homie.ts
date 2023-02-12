import mongoose from "mongoose";

export interface Homie {
  name: string;
  email: string;
  isReady: boolean;
}

const HomieSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, index: true},
  isReady: Boolean,
});

export const HomieModel = mongoose.model("homie", HomieSchema);