import { QuizResult } from "@/models/quiz-results.-model";
import { Types } from "mongoose";

// lib/actions/quiz/getQuizStats.ts
export const getQuizStats = async (quizId: string) => {
  const stats = await QuizResult.aggregate([
    { $match: { quiz: new Types.ObjectId(quizId) } },
    {
      $group: {
        _id: null,
        totalAttempts: { $sum: 1 },
        averageScore: { $avg: "$score" },
        passRate: {
          $avg: {
            $cond: [{ $gte: ["$score", 50] }, 1, 0],
          },
        },
        // averageTime: { $avg: "$completionTime" },
        highestScore: { $max: "$score" },
        lowestScore: { $min: "$score" },
      },
    },
  ]);

  return (
    stats[0] ?? {
      totalAttempts: 0,
      averageScore: 0,
      passRate: 0,
      //   averageTime: 0,
      highestScore: 0,
      lowestScore: 0,
    }
  );
};
