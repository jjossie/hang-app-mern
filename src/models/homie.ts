import mongoose from "mongoose";

export interface IHomie {
  name: string;
  email?: string;
  isReady?: boolean;
  tokenData?: object
}

const HomieSchema = new mongoose.Schema<IHomie>({
  name: {type: String, required: true},
  email: {type: String, required: true, index: true},
  isReady: Boolean,
});

export const HomieModel = mongoose.model("homie", HomieSchema);