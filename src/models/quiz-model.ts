import mongoose, { Document, Model, ObjectId, Schema, Types } from "mongoose";

interface IQuestion {
  questionText: string;
  options: Array<string>;
  correctOption: number;
}

interface IQuiz extends Document {
  title: string;
  description?: string;
  course: ObjectId;
  questions: Array<IQuestion>;
  createdBy: string; // it'll be teacher userName
  createdAt: Date;
  updatedAt: Date;
}

const questionSchema = new Schema<IQuestion>({
  questionText: {
    type: String,
    required: true,
    trim: true,
  },
  options: {
    type: [String],
    required: [true, "Options are required"],
    min: [2, "Two options mandatory for a question"],
    max: [6, "Maximum of 6 options allowed"],
  },

  correctOption: {
    type: Number,
    required: true,
    default: 0,
  },
});

const quizSchema: Schema<IQuiz> = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
    },
    course: {
      type: Types.ObjectId,
      ref: "Course",
      required: true,
    },
    createdBy: {
      type: String,
      required: [true, "Quiz author is required"],
    },
    questions: {
      type: [questionSchema],
      required: [true, "At least one question is required for quiz"],
    },
  },
  { timestamps: true }
);

export const Quiz =
  (mongoose.models?.Quiz as Model<IQuiz>) ||
  mongoose.model<IQuiz>("Quiz", quizSchema);
