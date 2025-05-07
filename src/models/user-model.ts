import mongoose, { Model, ObjectId, Schema } from "mongoose";

import { ROLE } from "@/types/index";

interface IUserModel extends Document {
  userName: string;
  fullName: string;
  email: string;
  password?: string;
  registerationId?: string;
  role?: ROLE;
  picture?: string;
  provider?: string;
  providerId?: string;
  coursesEnrolled?: [ObjectId];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<IUserModel> = new Schema(
  {
    userName: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    fullName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      index: true,
      required: true,
    },
    password: {
      type: String,
    },
    registerationId: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      // required: true,
      default: ROLE.teacher,
    },
    picture: {
      type: String,
    },
    provider: {
      type: String,
    },
    providerId: {
      type: String,
    },
    coursesEnrolled: { type: [Schema.Types.ObjectId], ref: "Course", default: [] },
  },
  { timestamps: true }
);

export const User = (mongoose.models?.User as Model<IUserModel>) || mongoose.model<IUserModel>("User", userSchema);
