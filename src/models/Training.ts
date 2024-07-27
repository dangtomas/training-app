import mongoose, { model, Schema } from "mongoose";

const TrainingSchema = new Schema({
    date: Date,
    duration: Number,
    isTrainer: Boolean,
    courts: Number,
    courtPrice: Number,
    activity: String,
    attendance: [String],
    info: String
});

const modelExport = mongoose.models.Training || model("Training", TrainingSchema)

export default modelExport;