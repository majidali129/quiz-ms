import mongoose, { Document, Model, ObjectId, Schema, Types } from "mongoose";

interface ICourse extends Document {
  title: string;
  description?: string;
  category: string;
  instructor: ObjectId;
  price?: number;
  duration?: number; // in minutes or hours
  level: "beginner" | "intermediate" | "advanced";
  createdAt: Date;
  updatedAt: Date;
}

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    description: { type: String, trim: true },
    category: { type: String, required: true, index: true },
    instructor: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    price: { type: Number, min: 0, default: 0, index: true },
    duration: { type: Number, min: 1, index: true }, // Example: total course duration in minutes/hours
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

export const Course =
  (mongoose.models?.Course as Model<ICourse>) ||
  mongoose.model<ICourse>("Course", courseSchema);
