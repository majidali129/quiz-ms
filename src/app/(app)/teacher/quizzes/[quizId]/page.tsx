import { getQuiz } from "@/features/queries/get-quiz";
import { QuizDetails } from "@/features/quiz/components/quiz-details";
import { notFound } from "next/navigation";

type QuizDetailsPageProps = {
  params: Promise<{ quizId: string }>;
};

const QuizDetailsPage = async ({ params }: QuizDetailsPageProps) => {
  const ticketId = (await params).quizId;
  const quiz = await getQuiz(ticketId);

  if (!quiz) notFound();

  return <QuizDetails quiz={quiz} />;
};
export default QuizDetailsPage;
