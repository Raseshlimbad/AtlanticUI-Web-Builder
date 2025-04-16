import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
  analyticsId: {
    type: String,
    required: true,
    unique: true,
  },
  timestamps: {
    type: Array,
    required: true,
  },
});

export default mongoose.models.Analytics ||
  mongoose.model("Analytics", analyticsSchema);
