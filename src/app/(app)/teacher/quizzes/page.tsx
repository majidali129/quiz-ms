import QuizList from "@/features/quiz/components/quizList";
import { Suspense } from "react";

const TeacherQuizzesPage = async () => {
  return (
    <Suspense fallback={<div>Loading ....</div>}>
      <QuizList />
    </Suspense>
  );
};

export default TeacherQuizzesPage;
