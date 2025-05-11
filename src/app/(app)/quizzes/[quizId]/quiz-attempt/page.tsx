import { getQuiz } from "@/features/queries/get-quiz";
import { QuizAttempt } from "@/features/quiz/components/quiz-attempt";
import { notFound } from "next/navigation";

type QuizAttemptProps = {
  params: Promise<{ quizId: string }>;
};
const QuizAttemptPage = async ({ params }: QuizAttemptProps) => {
  const quizId = (await params).quizId;

  const quiz = await getQuiz(quizId);
  if (!quiz) return notFound();
  console.log(quiz);

  return <QuizAttempt quiz={quiz} />;
};
export default QuizAttemptPage;
