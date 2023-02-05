import mongoose from "mongoose";

const HomieSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: String,
    isReady: Boolean
});

export const HomieModel = mongoose.model("homie", HomieSchema);