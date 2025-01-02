import mongoose from "mongoose";

export const CommonSchema = new mongoose.Schema({
    Direct: String,
    House: String,
    Ending: String,
})

export default mongoose.model('Common', CommonSchema)