import { model, Schema } from "mongoose";

const TrainingSchema = new Schema({
    date: { type: Date },
    duration: { type: Number },
    isTrainer: { type: Boolean },
    courts: { type: Number },
    courtPrice: { type: Number },
    activity: { type: String },
    attendance: [String],
    info: { type: String }
});

export default model("Training", TrainingSchema);