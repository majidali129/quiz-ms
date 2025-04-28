import { getQuizzes } from "@/features/queries/get-quizzes";
import QuizList from "@/features/quiz/components/quizList";

const TeacherQuizzesPage = async () => {
  const quizzes = await getQuizzes();
  return <QuizList quizzes={quizzes} />;
};
export default TeacherQuizzesPage;
