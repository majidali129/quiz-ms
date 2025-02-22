import mongoose, { Document, Model, ObjectId, Schema, Types } from "mongoose";

interface IQuestion {
  questionText: string;
  options: Array<string>;
  correctOption: number;
}

interface IQuizConstraints {
  duration: number;
  maxAttempts: number;
  passingScore: number;
  isActive: boolean;
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
  startDate: Date;
  startTime: string;
}

export interface IQuiz extends Document {
  title: string;
  description?: string;
  course: ObjectId;
  createdBy: string; // it'll be teacher userName
  questions: Array<IQuestion>;
  constraints?: IQuizConstraints;
  quizSession?: string;
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

const constraintsSchema = new Schema<IQuizConstraints>({
  duration: {
    type: Number,
    required: true,
    min: [1, "Minimum duration is 1 minute"],
    max: [180, "Maximum duration is 180 minutes"],
    default: 30,
  },
  maxAttempts: {
    type: Number,
    required: true,
    min: [1, "At least 1 attempt must be allowed"],
    max: [10, "Maximum attempts allowed are 10"],
    default: 3,
  },
  passingScore: {
    type: Number,
    required: true,
    min: [1, "Passing score must be at least 1%"],
    max: [100, "Passing score cannot exceed 100%"],
    default: 50,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  shuffleQuestions: {
    type: Boolean,
    required: true,
    default: false,
  },
  shuffleOptions: {
    type: Boolean,
    required: true,
    default: false,
  },
  startDate: {
    type: Date,
    required: [true, "Quiz start date is required"],
  },
  startTime: {
    type: String,
    required: [true, "Quiz start time is required"],
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
    constraints: {
      type: constraintsSchema,
    },
    quizSession: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Quiz =
  (mongoose.models?.Quiz as Model<IQuiz>) ||
  mongoose.model<IQuiz>("Quiz", quizSchema);
