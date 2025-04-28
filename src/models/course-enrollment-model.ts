import mongoose, { Document, Model, ObjectId, Schema, Types } from "mongoose";

interface ICourseEnrollment extends Document {
  course: ObjectId;
  student: ObjectId; // this can be either any student/user or course creator itself ( as a student )
  enrollmentDate: Date;
  enrollmentStatus: "active" | "completed" | "dropped";
  updatedAt: Date;
  createdAt: Date;
}

const courseEnrollmentSchema: Schema<ICourseEnrollment> = new Schema(
  {
    course: {
      type: Types.ObjectId,
      ref: "Course",
      required: true,
    },
    student: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    enrollmentDate: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    enrollmentStatus: {
      type: String,
      enum: ["active", "completed", "dropped"],
      default: "active",
    },
  },
  { timestamps: true }
);

export const CourseEnrollment = (mongoose.models?.CourseEnrollment as Model<ICourseEnrollment>) || mongoose.model<ICourseEnrollment>("CourseEnrollment", courseEnrollmentSchema);
