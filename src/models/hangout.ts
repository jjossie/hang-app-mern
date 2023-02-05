import mongoose, {model} from "mongoose";


const ObjectId = mongoose.Schema.Types.ObjectId;

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
                timeTaken: Number
            }]
        }],
    }]
});

export const HangoutModel = model("hangout", HangoutSchema);