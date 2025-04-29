import Spinner from "@/components/spinner";
import QuizList from "@/features/quiz/components/quizList";
import { Suspense } from "react";

const TeacherQuizzesPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <QuizList />
    </Suspense>
  );
};

export default TeacherQuizzesPage;
