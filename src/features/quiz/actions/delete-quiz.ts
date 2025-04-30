"use server";

import { fromErrorToActionState } from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { connectDB } from "@/lib/connect-db";
import { Quiz } from "@/models/quiz-model";
import { quizzesPath } from "@/paths/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteQuiz = async (quizId: string) => {
  await connectDB();
  try {
    console.log("delete quiz called");
    const { user } = await getAuthOrRedirect();
    const quiz = await Quiz.findById(quizId);
    console.log(quiz, quizId);
    console.log(user.userName);
    // const isOwner = user.userName === quiz?.createdBy;
    // if (!quiz || !isOwner) {
    //   return toActionState("ERROR", "Not authorized");
    // }

    await Quiz.findByIdAndDelete(quizId);
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(quizzesPath());
  redirect(quizzesPath());
};
