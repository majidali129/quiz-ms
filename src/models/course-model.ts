import { CourseLevel } from "@/features/course/types";
import mongoose, { Document, Model, ObjectId, Schema, Types } from "mongoose";

interface ICourse extends Document {
  title: string;
  description?: string;
  code: string;
  requireApproval?: boolean;
  category: string;
  price: number;
  duration: number;
  level: CourseLevel;
  createdBy: ObjectId;
  students?: [ObjectId];
  isActive: boolean;
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
    code: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    requireApproval: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      message: "Level can be either beginner, intermediate or advanced ",
      default: CourseLevel.beginner,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    students: {
      type: [Types.ObjectId],
      ref: "User",
      default: [],
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Course = (mongoose.models?.Course as Model<ICourse>) || mongoose.model<ICourse>("Course", courseSchema);
