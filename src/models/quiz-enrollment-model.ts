import mongoose, { Document, Model, ObjectId, Schema, Types } from "mongoose";

interface IQuizEnrollment extends Document {
  teacher: ObjectId;
  registrationId: string;
  course: string;
  status?: "pending" | "approved" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

const quizEnrollmentSchema: Schema<IQuizEnrollment> = new Schema(
  {
    teacher: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    registrationId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    course: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const QuizEnrollment =
  (mongoose.models?.QuizEnrollment as Model<IQuizEnrollment>) ||
  mongoose.model<IQuizEnrollment>("QuizEnrollment", quizEnrollmentSchema);
