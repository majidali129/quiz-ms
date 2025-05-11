export const enum QuizType {
  Objective = "Objective",
  Subjective = "Subjective",
}

export const enum QuizDifficulty {
  easy = "easy",
  medium = "medium",
  hard = "hard",
}

export const enum QuizCompleteStatus {
  "not-started" = "not-started",
  "in-progress" = "in-progress",
  completed = "completed",
}
export interface IQuizSettings {
  duration: number;
  maxAttempts: number;
  passingScore: number;
  showAnswers: boolean;
}

export interface IQuizSchedule {
  startDate: string;
  endDate: string;
  startTime: string;
  isActive?: boolean;
}

export type Question = {
  _id: string;
  questionText: string;
  options: string[];
  correctOption: number;
};

export type Quiz = {
  _id: string;
  title: string;
  description?: string;
  course: { _id: string; title: string; category: string };
  quizType: QuizType;
  createdBy: { _id: string; userName: string; picture: string };
  questions: { _id: string } & Question[];
  settings: IQuizSettings;
  schedule: IQuizSchedule;
  quizSession?: string;
  completionStatus?: QuizCompleteStatus;
  difficulty: QuizDifficulty;
  createdAt: Date;
  updatedAt: Date;
};

export interface Answer {
  question: string;
  selectedOption: number;
  correctOption: number;
  isCorrect: boolean;
}

export type QuizResult = {
  _id: string;
  quiz: { _id: string; title: string };
  student: { _id: string; userName: string; picture: string };
  score: number;
  totalQuestions: number;
  submission: Answer[];
  attemptNumber: number;
  submittedAt: Date;
  isPassed: boolean;
  createdAt: Date;
  updatedAt: Date;
};
