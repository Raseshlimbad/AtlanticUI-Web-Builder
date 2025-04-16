import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    projects: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
