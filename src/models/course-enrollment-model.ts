import mongoose, { Document, Model, ObjectId, Schema, Types } from "mongoose";

interface ICourseEnrollment extends Document {
  courseId: ObjectId;
  studentId: ObjectId;
  enrolledAt: string;
  enrollmentStatus: "active" | "completed" | "dropped";
  unEnrolledAt?: string;
  updatedAt: Date;
  createdAt: Date;
}

const courseEnrollmentSchema: Schema<ICourseEnrollment> = new Schema(
  {
    courseId: {
      type: Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },
    studentId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    enrolledAt: {
      type: String,
      required: true,
    },
    enrollmentStatus: {
      type: String,
      enum: ["active", "completed", "dropped"],
      default: "active",
      index: true,
    },
    unEnrolledAt: {
      type: String,
    },
  },
  { timestamps: true }
);

export const CourseEnrollment = (mongoose.models?.CourseEnrollment as Model<ICourseEnrollment>) || mongoose.model<ICourseEnrollment>("CourseEnrollment", courseEnrollmentSchema);
