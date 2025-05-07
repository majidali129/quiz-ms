import Spinner from "@/components/spinner";
import QuizList from "@/features/quiz/components/quizList";
import { Suspense } from "react";

const QuizzesPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <QuizList />
    </Suspense>
  );
};

export default QuizzesPage;
