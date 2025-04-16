import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  projectID: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  creatorID: {
    type: String,
    required: true,
  },
  code: {
    type: Object,
    required: true,
  },
});

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);
