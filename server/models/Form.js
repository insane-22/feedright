import mongoose from "mongoose";

const formSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    title: { type: String, required: true },
    questions: [
      {
        questionText: { type: String, required: true },
        type: { type: String, enum: ["text", "mcq"], required: true },
        options: [String], // for MCQ only
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("forms", formSchema);
