import mongoose, { Model, Schema } from "mongoose";

export enum ROLE {
  student = "student",
  teacher = "teacher",
}

interface IUserModel extends Document {
  username: string;
  fullName: string;
  email: string;
  password: string;
  registerationNo?: string;
  role: ROLE;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<IUserModel> = new Schema({
  username: {
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
    required: true,
  },
  registerationNo: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    default: ROLE.teacher,
  },
  refreshToken: {
    type: String,
    trim: true,
  },
});

export const User =
  (mongoose.models.User as Model<IUserModel>) ||
  mongoose.model<IUserModel>("User", userSchema);
