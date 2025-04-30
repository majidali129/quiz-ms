export const enum QuizType {
  Objective = "Objective",
  Subjective = "Subjective",
}

export type IQuizConstraints = {
  duration: number;
  maxAttempts: number;
  passingScore: number;
  isActive?: boolean;
  shuffleQuestions?: boolean;
  shuffleOptions?: boolean;
  startDate: Date;
  startTime: string;
};

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

export type Question = {
  questionText: string;
  options: string[];
  correctOption: number;
};

export type Quiz = {
  _id: string;
  title: string;
  description: string;
  quizType: QuizType;
  course: string;
  createdBy: string;
  questions: Question[];
  startDate: string;
  startTime: string;
  quizDuration: number;
  maxAttempts: number;
  passingScore: number;
  completionStatus?: QuizCompleteStatus;
  isActive?: boolean;
  quizSession?: string;
  difficulty: QuizDifficulty;
  createdAt: Date;
  updatedAt: Date;
};
