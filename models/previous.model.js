import mongoose from "mongoose";

export const PreviousSchema = new mongoose.Schema({
    Date: String,
    FR: String,
    SR: String
})

export default mongoose.model('Previous', PreviousSchema)