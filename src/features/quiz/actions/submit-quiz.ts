"use server";

import { fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { getAuth } from "@/features/auth/queries/get-auth";
import { connectDB } from "@/lib/connect-db";
import { Quiz } from "@/models/quiz-model";
import { QuizResult } from "@/models/quiz-results.-model";
import { quizPath } from "@/paths/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const submitQuiz = async (quizId: string, result: Record<string, number>) => {
  await connectDB();
  try {
    console.log("Submit quiz called");
    const user = await getAuth();
    const quiz = await Quiz.findById(quizId).lean().exec();

    if (!quiz) {
      return toActionState("ERROR", "Quiz not found");
    }
    const quizQuestions = quiz.questions;

    const userSubmission = quizQuestions.map((question) => {
      const answer = result[question._id!.toString()];
      return {
        // question: new Types.ObjectId(question._id),
        question: question._id,
        selectedOption: answer,
        correctOption: question.correctOption,
        isCorrect: answer === question.correctOption,
      };
    });

    const previousAttempt = await QuizResult.findOne({ quiz: quizId, student: user.id });

    if (previousAttempt) {
      console.log("previousAttempt", previousAttempt);
      previousAttempt.score = userSubmission.filter((answer) => answer.isCorrect).length;
      previousAttempt.totalQuestions = quizQuestions.length;
      previousAttempt.submission = userSubmission;
      previousAttempt.attemptNumber++;
      previousAttempt.submittedAt = new Date();
      previousAttempt.isPassed = userSubmission.filter((answer) => answer.isCorrect).length >= quiz.settings.passingScore;

      await previousAttempt.save({ validateBeforeSave: false });
    } else {
      const newAttempt = {
        quiz: quizId,
        student: user.id,
        score: userSubmission.filter((answer) => answer.isCorrect).length,
        totalQuestions: quizQuestions.length,
        submission: userSubmission,
        attemptNumber: 1,
        submittedAt: new Date(),
        isPassed: userSubmission.filter((answer) => answer.isCorrect).length >= quiz.settings.passingScore,
      };

      console.log("finalResult", newAttempt);
      const quizSubmission = await QuizResult.create(newAttempt);
      console.log("quizSubmission", quizSubmission);
    }
  } catch (error) {
    console.log("error", error);
    return fromErrorToActionState(error);
  }

  revalidatePath(quizPath(quizId));
  redirect(quizPath(quizId));
};
