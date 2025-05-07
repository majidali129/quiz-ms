import { IQuizSchedule, IQuizSettings, QuizCompleteStatus, QuizDifficulty } from "@/features/quiz/types";
import mongoose, { Document, Model, ObjectId, Schema, Types } from "mongoose";

interface IQuestion {
  questionText: string;
  options: Array<string>;
  correctOption: number;
}

const enum QuizType {
  Objective = "Objective",
  Subjective = "Subjective",
}

export interface IQuiz extends Document {
  title: string;
  description?: string;
  course: ObjectId;
  quizType: QuizType;
  createdBy: ObjectId;
  difficulty: QuizDifficulty;
  questions: Array<IQuestion>;
  settings: IQuizSettings;
  schedule: IQuizSchedule;
  quizSession?: string;
  completionStatus?: QuizCompleteStatus;
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

const quizSettingsSchema = new Schema<IQuizSettings>({
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
  showAnswers: {
    type: Boolean,
    default: false,
  },
});

const quizSchedultSchema = new Schema<IQuizSchedule>({
  startDate: {
    type: String,
    required: [true, "Quiz start date is required"],
  },
  endDate: {
    type: String,
    required: [true, "Quiz end date is required"],
  },
  startTime: {
    type: String,
    required: [true, "Quiz start time is required"],
  },
  isActive: {
    type: Boolean,
    default: false,
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
      required: [true, "Course is required"],
      index: true,
    },
    quizType: {
      type: String,
      required: [true, "Quiz type is required"],
      default: QuizType.Objective,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "Quiz author is required"],
      index: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      message: "Invalid difficulty value. ",
      default: QuizDifficulty["easy"],
      index: true,
    },
    questions: {
      type: [questionSchema],
      required: [true, "At least one question is required for quiz"],
    },
    settings: quizSettingsSchema,
    schedule: quizSchedultSchema,
    quizSession: {
      type: String,
    },

    completionStatus: {
      type: String,
      enum: ["not-started", "in-progress", "completed"],
      message: "Invalid completion status value. ",
      default: QuizCompleteStatus["not-started"],
      index: true,
    },
  },
  { timestamps: true }
);

export const Quiz = (mongoose.models?.Quiz as Model<IQuiz>) || mongoose.model<IQuiz>("Quiz", quizSchema);
