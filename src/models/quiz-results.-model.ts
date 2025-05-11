import { Document, Model, model, models, ObjectId, Schema, Types } from "mongoose";

interface IAnswer {
  question: ObjectId;
  selectedOption: number;
  correctOption: number;
  isCorrect: boolean;
}
interface IQuizResultsModel extends Document {
  quiz: ObjectId;
  student: ObjectId;
  score: number;
  totalQuestions: number;
  submission: IAnswer[];
  attemptNumber: number;
  submittedAt: Date;
  isPassed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const asnwerSchema = new Schema<IAnswer>({
  question: {
    type: Types.ObjectId,
    ref: "Question",
    required: true,
  },
  selectedOption: {
    type: Number,
    required: true,
  },
  correctOption: {
    type: Number,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
});
const quizResultSchema: Schema<IQuizResultsModel> = new Schema(
  {
    quiz: {
      type: Types.ObjectId,
      ref: "Quiz",
      required: true,
      index: true,
    },
    student: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    score: {
      type: Number,
      required: true,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    submission: {
      type: [asnwerSchema],
      default: [],
    },
    attemptNumber: {
      type: Number,
      required: true,
    },
    submittedAt: {
      type: Date,
      required: true,
    },
    isPassed: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export const QuizResult = (models?.QuizResult as Model<IQuizResultsModel>) || model<IQuizResultsModel>("QuizResult", quizResultSchema);
