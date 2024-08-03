import mongoose, { model, Schema } from "mongoose";

const WeekSchema = new Schema({
    name: String,
    from: Date,
    to: Date,
});

const modelExport = mongoose.models.Week || model("Week", WeekSchema);

export default modelExport;
